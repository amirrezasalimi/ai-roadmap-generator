import dagre from 'dagre';
import ReactFlow, {
    useNodesState,
    useEdgesState,
    ConnectionMode,
} from 'reactflow';
import 'reactflow/dist/style.css';
import styles from './styles.module.css';
import CustomNode from "@/modules/flow/components/custom-node";
import FloatingEdge from "@/modules/flow/components/floating-edge";
import { useEffect } from "react";
import mobileAndTabletCheck from "@/shared/helper/mobile-and-tablet-check";

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
const nodeWidth = 300;
const nodeHeight = 67;
const offsetBaseLine = 300;

const dagreGraphRight = new dagre.graphlib.Graph({
    acyclicer: "greedy"
});


const dagreGraphLeft = new dagre.graphlib.Graph({
    acyclicer: "greedy"
});
dagreGraphRight.setDefaultEdgeLabel(() => ({}));
dagreGraphLeft.setDefaultEdgeLabel(() => ({}));
dagreGraphRight.setGraph({
    acyclicer: "greedy",
    nodesep: 5,
    edgesep: 5,
    ranksep: 5
})
dagreGraphLeft.setGraph({
    acyclicer: "greedy",
    nodesep: 5,
    edgesep: 5,
    ranksep: 5
})

const isDraggable = mobileAndTabletCheck();

const dataToDataNode = async (nodes) => {
    const result = [];

    for await (let _node of nodes) {
        const nodeIsClone = _node?.clone;
        const finallyDraggable = !isDraggable && !nodeIsClone;
        const nodeData = {
            id: String(nodeIsClone ? placeholderNodeIdClone + _node.id : placeholderNodeId + _node.id),
            numberId: _node.id,
            data: {
                clone: !!nodeIsClone,
                level: _node.level,
                label:
                    nodeIsClone? "" :
                    <div>
                        {_node.title}
                    </div>
            },
            level: _node.level,
            clone: !!nodeIsClone,
            draggable: finallyDraggable,
            parentId: String(nodeIsClone && _node.level > 2 ? placeholderNodeIdClone + _node.parent : placeholderNodeId + _node.parent),
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
                clone: true,
                level: _ne.level,
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
    let otherNodes = [];
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
    otherNodes = otherNodes.sort((a, b)=> (a.parent - b.parent));

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
        baseNodes: await dataToDataNode(baseNodes.sort((a, b)=> (a.parent - b.parent))),
        rightNodes: await dataToDataNode(rightNodes.sort((a, b)=> (a.parent - b.parent))),
        leftNodes: await dataToDataNode(leftNodes.sort((a, b)=> (a.parent - b.parent))),
    }
};

const generateEdges = (_baseNodes, _leftNodes, _rightNodes) => {
    const baseEdges = [];
    _baseNodes.forEach((_node, _index) => {
        const beforeNodeId = _baseNodes[_index - 1]?.id;
        baseEdges.push({
            id: String(placeholderEdgeId + "base-" + _index),
            source: beforeNodeId,
            target: _node.id,
            data: {
                locked: false,
                level: _node.level,
                clone: false,
            },
            type: 'floating',
            sourceHandle: "d",
            targetHandle: "b",
        });
        _leftNodes.forEach((_leftNode, _index) => {
            if(_node.id === _leftNode.parentId){
                baseEdges.push({
                    id: String(placeholderEdgeId + "base-to-left-" + _index),
                    source: _node.id,
                    target: _leftNode.id,
                    data: {
                        locked: false,
                        level: _node.level,
                        clone: !!_leftNode?.clone,
                    },
                    type: 'floating',
                    sourceHandle: "d",
                    targetHandle: "b",
                });
            }
        })
        _rightNodes.forEach((_rightNode, _index) => {
            if(_node.id === _rightNode.parentId){
                baseEdges.push({
                    id: String(placeholderEdgeId + "base-to-right-" + _index),
                    source: _node.id,
                    target: _rightNode.id,
                    data: {
                        locked: false,
                        level: _node.level,
                        clone: !!_rightNode?.clone,
                    },
                    type: 'floating',
                    sourceHandle: "d",
                    targetHandle: "b",
                });
            }
        })
    });
    let leftEdges = _leftNodes.filter(_n => !_baseNodes.find(_bn => _bn.numberId === _n.numberParentId)).map((_node, _index) => ({
        id: String(placeholderEdgeId+ "left-" + _index),
        source:  _node.id,
        target: _node.parentId,
        type: 'floating',
        data: {
            locked: true,
            level: _node.level,
            clone: !!_node?.clone,
        },
        animated: true,
        sourceHandle: "b",
        targetHandle: "d",
    }));

    let rightEdges = _rightNodes.filter(_n => !_baseNodes.find(_bn => _bn.numberId === _n.numberParentId)).map((_node, _index) => ({
        id: String(placeholderEdgeId+ "right-" + _index),
        source: _node.id,
        target: _node.parentId,
        type: 'floating',
        data: {
            locked: true,
            level: _node.level,
            clone: !!_node?.clone,
        },
        animated: true,
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
    let previousNodesLastPosition = -117;
    _nodes.forEach((node, index) => {
        node.targetPosition = 'bottom';
        node.sourcePosition = 'top';
        const previousNodeBase = _nodes?.[index - 1]?.id;
        if (previousNodeBase) {
            previousNodesLastPosition = findLastPosition(previousNodeBase, previousNodesLastPosition, children);
        }
        if (index === 0) {
            node.position = {
                x: _offset - 104,
                y:  previousNodesLastPosition - 100,
            };
        } else {
            node.position = {
                x: (0 + _offset),
                y: previousNodesLastPosition  + spaceBetweenMainBlock + nodeHeight - 8.5,
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
            for (let i = 1; i <= difference; i++) {
                const index = rightChildren.findIndex(_fn=> _fn.id === rightChildren?.[rightChildren.length - i]?.id);
                const currentNodeChild = rightChildren[index];
                const nodeData = {
                    id: String(placeholderNodeIdClone+currentNodeChild.numberId),
                    numberId: currentNodeChild.numberId,
                    data: {
                        clone: true,
                        level: currentNodeChild.level,
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
                syncLeftNodes.splice(difference, 0, nodeData);
            }
        }
        else if (rightChildren.length < leftChildren.length) {
            const difference =  leftChildren.length - rightChildren.length;
            for (let i = 0; i < difference; i++) {
                const index = syncRightNodes.findIndex(_fn=> _fn.id === rightChildren?.[rightChildren.length - 1].id) || 0;
                const currentNodeChild = syncRightNodes[index];
                const nodeData = {
                    id: String(placeholderNodeIdClone+currentNodeChild.numberId),
                    numberId: currentNodeChild.numberId,
                    data: {
                        clone: true,
                        level: currentNodeChild.level,
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
                    "targetPosition": "left",
                    "sourcePosition": "right"
                }
                syncRightNodes.splice(difference, 0, nodeData);
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

            // const syncLeftNodes = leftNodes;
            // const syncRightNodes = rightNodes;
            const { syncLeftNodes, syncRightNodes } = syncNodes({
                rightNodes: rightNodes,
                leftNodes: leftNodes
            })
            console.log(syncLeftNodes, syncRightNodes)
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
            const startPositionBaseGraph = (((dagreGraphRight._label.width + dagreGraphLeft._label.width) + offsetBaseLine) / 2) - nodeWidth / 3;

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
    const firstNode = nodes[0];
    return (
        <>
            {nodes?.length && edges?.length &&
                <ReactFlow
                    className={styles.baseFlow}
                    nodes={nodes}
                    fitView
                    onInit={(instance) => {
                        instance.setViewport({y: Math.abs(firstNode.position.y) + 100 })
                    }}
                    fitViewOptions={{
                        zoom: 2
                    }}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    edgeTypes={edgeTypes}
                    nodeTypes={nodeTypes}
                    connectionMode={ConnectionMode.Loose}
                />
            }
        </>
    );
}

export default DrawFlow;


