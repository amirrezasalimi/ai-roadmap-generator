import dagre from 'dagre';
import { useCallback } from 'react';
import ReactFlow, { Controls, Background, useNodesState, useEdgesState, addEdge, MiniMap } from 'reactflow';
import 'reactflow/dist/style.css';
import styles from './styles.module.css';

const placeholderNodeId = "node-id-";
const placeholderEdgeId = "edge-id-";
const placeholderBaseEdgeId = "edge-id-base-";
const spaceBetweenMainBlock = 200;
const nodeWidth = 200;
const nodeHeight = 50;
const offsetBaseLine = 500;

const dagreGraphRight = new dagre.graphlib.Graph();

const dagreGraphLeft = new dagre.graphlib.Graph();

dagreGraphRight.setDefaultEdgeLabel(() => ({}));

dagreGraphLeft.setDefaultEdgeLabel(() => ({}));

const dataToDataNode = (data) => {
    return (
        {
            id: String(placeholderNodeId + data.id),
            data: {
                label:
                    <div>
                        {data.title}
                    </div>
            },
            level: data.level,
            position: { x: 0, y: 0 },
            style: { backgroundColor: 'black', color: 'white', width: 200, height: 50 },
        }
    )
};

const generateNodes = (data) => {
    const baseNodes = data.filter(d=> d.level === 0 || d.level === 1);
    const level2Nodes = data.filter(d => d.level === 2);
    const otherNodes = data.filter((d) =>(d.level > 2));
    const rightNodes = level2Nodes.filter((_d, index) =>(index % 2 === 0));
    const leftNodes = level2Nodes.filter((_d, index) =>(index % 2 !== 0));

    otherNodes.forEach((d)=> {
        if(rightNodes.find(fd=> fd.id === d.parent)){
            rightNodes.push(d);
        }
        if(leftNodes.find(fd=> fd.id === d.parent)){
            leftNodes.push(d);
        }
    })

    return {
        baseNodes: baseNodes.map((d => (dataToDataNode(d)))),
        rightNodes: rightNodes.map((d => (dataToDataNode(d)))),
        leftNodes: leftNodes.map((d => (dataToDataNode(d)))),
    }
};

const generateEdges = (data) => {
    const levelOneAndZeroData= data.filter(d=> d.level === 0 || d.level === 1);
    const level2Nodes = data.filter(d => d.level === 2);
    const baseEdges = levelOneAndZeroData.map((d, _index)=> {
        const beforeNodeId = levelOneAndZeroData[_index - 1]?.id;
        return{
            id: String(placeholderEdgeId + d.id),
            source: String(placeholderNodeId + d.id),
            target: String(placeholderNodeId + beforeNodeId),
            type: 'step',
        }
    });


    console.log(levelOneAndZeroData);

    console.log(level2Nodes);


    let rightLevelEdges = level2Nodes.filter((_d, index) =>(index % 2 === 0)).map(_d => ({
            id: String(placeholderEdgeId + _d.id),
            source: String(placeholderNodeId + _d.id),
            target: String(placeholderNodeId + _d.parent),
            type: 'step',
        }))
    
    let leftLevel2Edges = level2Nodes.filter((_d, index) =>(index % 2 !== 0)).map(_d => ({
        id: String(placeholderEdgeId + _d.id),
        source: String(placeholderNodeId + _d.id),
        target: String(placeholderNodeId + _d.parent),
        type: 'step',
    }))

    const otherEdges = data.filter(d=> d.level > 2).map((d) => {
        return{
            id: String(placeholderEdgeId + d.id),
            source: String(placeholderNodeId + d.id),
            target: String(placeholderNodeId + d.parent),
            type: 'step',
        }
    });

    otherEdges.forEach((d)=> {
   
        if(rightLevelEdges.find(fd=> fd.source === d.target)){  
            rightLevelEdges.push(d);
        }
        if(leftLevel2Edges.find(fd=> fd.source === d.target)){
            leftLevel2Edges.push(d);
        }
    })

    console.log(level2Nodes);

    rightLevelEdges = rightLevelEdges.filter((_e) => {
        return !baseEdges.find(fe => fe.source === _e.target);
    })
    leftLevel2Edges = leftLevel2Edges.filter((_e) => {
        return !baseEdges.find(fe => fe.source === _e.target);
    })

    level2Nodes.forEach((_node)=> {
        const _parent = data.find(_fd=> _fd.id === _node.parent);
        if(_parent.level === 1){
            baseEdges.push({
                id: String(placeholderEdgeId + _node.id),
                source: String(placeholderNodeId + _node.id),
                target: String(placeholderNodeId + _node.parent),
                type: 'step',
            })
        }
    })
    return {
            baseEdges,
            rightLevelEdges,
            leftLevel2Edges
    }
};

const getLayoutElements = (_nodes, _edges, _direction, _align, dagreGraph, offset) => {
    dagreGraph.setGraph({
        rankdir: _direction,
        align: _align
    });

    _nodes.forEach((node) => {
        dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });
    if(_edges) {
        _edges?.forEach((edge) => {
            dagreGraph.setEdge(edge.source, edge.target);
        });
    }

    dagre.layout(dagreGraph)
    
    _nodes.forEach((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);

            if(_direction === "LR"){
                node.targetPosition = 'left';
                node.sourcePosition = 'right';
            }
            if(_direction === "RL"){
                node.targetPosition = 'right';
                node.sourcePosition = 'left';
            }
            if(_direction === "TB"){
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

const getLayoutElementsBase = (_nodes, _edges, _offset ) => {

    _nodes.forEach((node, index) => {
        node.targetPosition = 'bottom';
        node.sourcePosition = 'top';
        node.position = {
            x: (0 + _offset),
            y: (index * 100),
        };
        return node;
    });
    return [_nodes, _edges];
};


function DrawFlow({ data }) {
    const { baseNodes, leftNodes, rightNodes } = generateNodes(data);
    const { baseEdges, leftLevel2Edges, rightLevelEdges } = generateEdges(data);

    const [layoutNodesLeft, layoutEdgesLeft] = getLayoutElements(
        leftNodes,
        leftLevel2Edges,
        "LR",
        "DL",
        dagreGraphLeft,
        0
    );

    const [layoutNodesRight, layoutEdgesRight] = getLayoutElements(
        rightNodes,
        rightLevelEdges,
        "RL",
        "DL",
        dagreGraphRight,
        dagreGraphLeft._label.width + offsetBaseLine
    );

    const startPositionBaseGraph = (((dagreGraphRight._label.width + dagreGraphLeft._label.width) + offsetBaseLine) / 2) - nodeWidth /2;

    const [layoutNodesBase] = getLayoutElementsBase(
        baseNodes,
        null,
        startPositionBaseGraph
    );

    const layoutNodes = [...layoutNodesBase, ...layoutNodesLeft, ...layoutNodesRight];
    const layoutEdges = [...baseEdges, ...layoutEdgesLeft, ...layoutEdgesRight];
    const [nodes, setNodes, onNodesChange] = useNodesState(layoutNodes);
    const [edges, setEdges] = useEdgesState(layoutEdges);

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
    return (
        <>
            <ReactFlow
                className={styles.baseFlow}
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onConnect={onConnect}
            >
                <Controls />
                <Background />
                <MiniMap />
            </ReactFlow>
        </>
    );
}

export default DrawFlow;