import dagre from 'dagre';
import ReactFlow, {
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    MiniMap,
    ConnectionMode
} from 'reactflow';
import 'reactflow/dist/style.css';
import styles from './styles.module.css';
import CustomNode from "@/modules/flow/components/custom-node";
import FloatingEdge from "@/modules/flow/components/flogting-edge";
import {useEffect} from "react";

const nodeTypes = {
    custom: CustomNode
};

const edgeTypes = {
    floating: FloatingEdge
};


const placeholderNodeId = "node-id-";
const placeholderEdgeId = "edge-id-";
const placeholderNodeIdClone = "node-id-clone-";
const placeholderEdgeIdClone = "edge-id-clone-";
const spaceBetweenMainBlock = 50;
const nodeWidth = 200;
const nodeHeight = 50;
const offsetBaseLine = 300;

const dagreGraphRight = new dagre.graphlib.Graph({

});



const dagreGraphLeft = new dagre.graphlib.Graph();
dagreGraphRight.setDefaultEdgeLabel(() => ({}));

dagreGraphLeft.setDefaultEdgeLabel(() => ({}));
dagreGraphRight.setGraph({
    nodesep: 5,
    edgesep: 5,
    ranksep: 5
})
dagreGraphLeft.setGraph({
    nodesep: 5,
    edgesep: 5,
    ranksep: 5
})
const dataToDataNode = async (nodes, data) => {
    const result = [];
    for await (let _node of nodes) {
        const nodeIsClone = _node?.clone;
        const nodeData = {
            id: String(nodeIsClone ? placeholderNodeIdClone + _node.id : placeholderNodeId + _node.id),
            numberId: _node.id,
            data: {
                label:
                    nodeIsClone? "" :
                    <div>
                        {_node.title}
                    </div>
            },
            level: _node.level,
            clone: !!nodeIsClone,
            parentId: String(nodeIsClone ? placeholderNodeIdClone + _node.parent : placeholderNodeId + _node.parent),
            numberParentId: _node.parent,
            position: {x: 0, y: 0},
            type: "custom"
        }
        result.push(nodeData)
    }

    return result.sort((a, b) => (a.numberId - b.numberId));
};

const getClone = (nodesIds, data, clone) => {
    let children = [];
    const _clone = [...clone];
    nodesIds.forEach(_ne => {
        _clone.push({...data.find((_df => _df.id === _ne)), clone: true,  data: {
                label:
                    <div>

                    </div>
            }, });
        children.push(...data.filter(_df => _df.parent === _ne))
    })

    if (children.length) {
        const childrenIds = children.map(_cm => (_cm.id))
        return getClone(childrenIds, data, _clone);
    } else {
        return _clone;
    }
}

const generateNodes = async (data) => {
    const baseNodes = [];
    const level2Nodes = [];
    const otherNodes = [];
    const rightNodes = [];
    const leftNodes = [];
    for await (let _data of data) {
        if (_data.level === 0 || _data.level === 1) {
            baseNodes.push(_data)
        } else if (_data.level === 2) {
            level2Nodes.push(_data);
        } else if (_data.level > 2) {
            otherNodes.push(_data);
        }
    }
    let indexLevel2Nodes = 0;
    for await (let _data of level2Nodes) {
        if (indexLevel2Nodes % 2 === 0) {
            rightNodes.push(_data)
        } else {
            leftNodes.push(_data);
        }
        indexLevel2Nodes = indexLevel2Nodes + 1;
    }

    for await (let _bn of baseNodes) {
        const children = level2Nodes.filter(_l2n => _l2n.parent === _bn.id);
        if (children?.length % 2 !== 0) {
            const lastChild = children[children.length - 1];
            const rightNodeIndex = rightNodes.findIndex(_fi => _fi.id === lastChild.id);
            const leftNodeIndex = leftNodes.findIndex(_fi => _fi.id === lastChild.id);
            const clone = getClone([lastChild.id], data, []);
            if (rightNodeIndex >= 0) {
                leftNodes.push(...clone);
            }
            if (leftNodeIndex >= 0) {
                rightNodes.push(...clone);
            }
        }
    }

    for await (let d of otherNodes) {
        const parentInRight = rightNodes.find(fd => fd.id === d.parent);
        const parentInLeft = leftNodes.find(fd => fd.id === d.parent);
        if (parentInRight && !parentInRight.clone) {
            rightNodes.push(d);
        }
        if (parentInLeft && !parentInLeft.clone) {
            leftNodes.push(d);
        }
    }

    return {
        baseNodes: await dataToDataNode(baseNodes),
        rightNodes: await dataToDataNode(rightNodes),
        leftNodes: await dataToDataNode(leftNodes),
    }
};

const generateEdges = (_baseNodes, _leftNodes, _rightNodes) => {
    const baseEdges = _baseNodes.map((d, _index) => {
        const beforeNodeId = _baseNodes[_index - 1]?.id;
        return {
            id: String(placeholderEdgeId + d.numberId),
            source: beforeNodeId,
            target: d.id,
            type: 'floating',
            sourceHandle: "d",
            targetHandle: "b",
        }
    });

    let leftEdges = _leftNodes.map(_node => ({
        id: String(_node.clone ? placeholderEdgeIdClone + _node.numberId : placeholderEdgeId + _node.numberId),
        source:  _node.id,
        target: _node.parentId,
        type: 'step',
        sourceHandle: "b",
        targetHandle: "d",
    }));

    let rightEdges = _rightNodes.map(_node => ({
        id: String(_node.clone ? placeholderEdgeIdClone + _node.numberId : placeholderEdgeId + _node.numberId),
        source: _node.id,
        target: _node.parentId,
        type: 'step',
        sourceHandle: "d",
        targetHandle: "b",
    }));

    return {
        baseEdges,
        rightEdges: rightEdges,
        leftEdges: leftEdges
    }
};

const getLayoutElements = (_nodes, _edges, _direction, _align, dagreGraph, offset) => {
    dagreGraph.setGraph({
        rankdir: _direction,
        align: _align
    });

    _nodes.forEach((node) => {
        dagreGraph.setNode(node.id, {width: nodeWidth, height: nodeHeight});
    });
    if (_edges) {
        _edges?.forEach((edge) => {
            dagreGraph.setEdge(edge.source, edge.target);
        });
    }

    dagre.layout(dagreGraph)

    _nodes.forEach((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);

        if (_direction === "LR") {
            node.targetPosition = 'left';
            node.sourcePosition = 'right';
        }
        if (_direction === "RL") {
            node.targetPosition = 'right';
            node.sourcePosition = 'left';
        }
        if (_direction === "TB") {
            node.targetPosition = 'top';
            node.sourcePosition = 'bottom';
        }

        node.position = {
            x: nodeWithPosition.x - nodeWidth / 2 + offset,
            y: nodeWithPosition.y - nodeHeight / 2,
        };
        return node;
    });
    return [_nodes, _edges];
};

const getLayoutElementsBase = (_nodes, _edges, _offset, children) => {
    let previousNodesLastPosition = 0;
    _nodes.forEach((node, index) => {
        node.targetPosition = 'bottom';
        node.sourcePosition = 'top';
        const previousNodeBase = _nodes?.[index - 1]?.id;
        if (previousNodeBase) {
            previousNodesLastPosition = findLastPosition(previousNodeBase, previousNodesLastPosition, children);

        }
        if (index === 0) {
            node.position = {
                x: (0 + _offset),
                y: (index) + previousNodesLastPosition,
            };
        } else {
            node.position = {
                x: (0 + _offset),
                y: previousNodesLastPosition + nodeHeight + spaceBetweenMainBlock,
            };
        }
        return node;
    });
    return [_nodes, _edges];
};

const findLastPosition = (parentId, lastPosition, data) => {
    const initialValue = {};
    const bigger = data.filter(_cf => _cf.parentId === parentId).reduce(
        (accumulator, currentValue) => {
            if (accumulator?.position?.y > currentValue?.position?.y)
                return accumulator
            return currentValue
        },
        initialValue
    );


    if (bigger?.parentId && lastPosition < bigger?.position?.y) {
        return findLastPosition(bigger.id, bigger.position?.y, data)
    } else {
        return lastPosition
    }
}

const syncNodes = ({rightNodes, leftNodes}) => {
    const syncRightNodes = [...rightNodes];
    const syncLeftNodes = [...leftNodes];

    syncRightNodes.forEach((_node, index) => {
        const currentLeftNode = syncLeftNodes[index];
        const currentRightNode = syncRightNodes[index];
        const leftChildren = syncLeftNodes.filter(_nf => _nf.numberParentId === syncLeftNodes[index]?.numberId);
        const rightChildren = syncRightNodes.filter(_nf => _nf.numberParentId === syncRightNodes[index]?.numberId);
        if (leftChildren.length < rightChildren.length) {
            const difference = rightChildren.length - leftChildren.length;
            for (let i = 0; i < difference; i++) {
                const index = syncLeftNodes.findIndex(_fn=> _fn.id === leftChildren?.[leftChildren.length - 1]?.id);
                const currentNodeChild = syncLeftNodes[index];
                const nodeData = {
                    id: String(placeholderNodeIdClone+currentNodeChild.id),
                    numberId: currentNodeChild.id,
                    data: {
                        label:
                            <div>

                            </div>
                    },
                    level: currentNodeChild.level,
                    clone: true,
                    parentId: String(currentLeftNode.id),
                    numberParentId: currentLeftNode.numberId,
                    position: {x: 0, y: 0},
                    "type": "custom",
                    "targetPosition": "right",
                    "sourcePosition": "left"
                }
                syncLeftNodes.splice(index + 1, 0, nodeData);
            }
        }
        if (rightChildren.length < leftChildren.length) {
            const difference =  leftChildren.length - rightChildren.length;
            for (let i = 0; i < difference; i++) {
                const index = syncRightNodes.findIndex(_fn=> _fn.id === rightChildren?.[rightChildren.length - 1].id) || 0;
                const currentNodeChild = syncRightNodes[index];
                const nodeData = {
                    id: String(placeholderNodeIdClone+currentNodeChild.id),
                    numberId: currentNodeChild.id,
                    data: {
                        label:
                            <div>

                            </div>
                    },
                    level: currentNodeChild.level,
                    clone: true,
                    parentId: String(currentRightNode.id),
                    numberParentId: currentRightNode.numberId,
                    position: {x: 0, y: 0},
                    "type": "custom",
                    "targetPosition": "right",
                    "sourcePosition": "left"
                }
                syncRightNodes.splice(index + 1, 0, nodeData);
            }
        }
    })
    return {
        syncLeftNodes,
        syncRightNodes
    }
}

function DrawFlow({data}) {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges] = useEdgesState([]);
    useEffect(() => {
        (async function () {
            const {baseNodes, leftNodes, rightNodes} = await generateNodes(data);
            const { syncLeftNodes, syncRightNodes } = syncNodes({
                rightNodes: rightNodes,
                leftNodes: leftNodes
            })
            const {baseEdges, leftEdges, rightEdges} = generateEdges(baseNodes, syncLeftNodes, syncRightNodes);

            const [layoutNodesLeft, layoutEdgesLeft] = getLayoutElements(
                syncLeftNodes,
                leftEdges,
                "LR",
                "DL",
                dagreGraphLeft,
                0
            );

            const [layoutNodesRight, layoutEdgesRight] = getLayoutElements(
                syncRightNodes,
                rightEdges,
                "RL",
                "DL",
                dagreGraphRight,
                dagreGraphLeft._label.width + offsetBaseLine
            );
            const startPositionBaseGraph = (((dagreGraphRight._label.width + dagreGraphLeft._label.width) + offsetBaseLine) / 2) - nodeWidth / 2;

            const [layoutNodesBase] = getLayoutElementsBase(
                baseNodes,
                null,
                startPositionBaseGraph,
                [...layoutNodesLeft, ...layoutNodesRight]
            );
            setNodes([...layoutNodesBase, ...layoutNodesLeft, ...layoutNodesRight]);
            setEdges([...baseEdges, ...layoutEdgesLeft, ...layoutEdgesRight]);
        }())
    }, [])

    return (
        <>
            {nodes?.length && edges?.length &&
                <ReactFlow
                    className={styles.baseFlow}
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    edgeTypes={edgeTypes}
                    nodeTypes={nodeTypes}
                    fitView
                    connectionMode={ConnectionMode.Loose}
                >
                    <Controls/>
                    <Background/>
                    <MiniMap/>
                </ReactFlow>
            }
        </>
    );
}

export default DrawFlow;


