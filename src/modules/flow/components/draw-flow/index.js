import dagre from 'dagre';
import { useCallback } from 'react';
import ReactFlow, { Controls, Background, useNodesState, useEdgesState, addEdge } from 'reactflow';
import 'reactflow/dist/style.css';
import styles from './styles.module.css';

const placeholderNodeId = "node-id-";
const placeholderEdgeId = "edge-id-";
const spaceBetweenMainBlock = 100;
const nodeWidth = 172;
const nodeHeight = 36;

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const generateNodes = (data) => {
    return data.map((item, _index) => {
        const level = item.level;
        switch (level) {
            case 1:
                return (
                    {
                        id: String(placeholderNodeId + item.id),
                        data: {
                            label:
                                <div>
                                    {item.title}
                                </div>
                        },
                        position: { x: 0, y: spaceBetweenMainBlock * _index },
                        style: { backgroundColor: 'black', color: 'white' },
                    }
                )
            case 2:
                return (
                    {
                        id: String(placeholderNodeId + item.id),
                        data: {
                            label:
                                <div>
                                    {item.title}
                                </div>
                        },
                        position: { x: 0, y: spaceBetweenMainBlock * _index },
                        style: { backgroundColor: 'black', color: 'white' },
                    }
                )
            default:
                return ({
                    id: String(placeholderNodeId + item.id),
                    data: {
                        label:
                            <div>
                                {item.title}
                            </div>
                    },
                    position: { x: 0, y: spaceBetweenMainBlock * _index },
                    style: { backgroundColor: 'black', color: 'white' },
                }
                )
        }
    });
}

const generateEdges = (data) => {
    return data.map((d) => ({
        id: String(placeholderEdgeId + d.id),
        source: String(placeholderNodeId + d.id),
        target: String(placeholderNodeId + d.parent),
    }
    ));
}

const getLayoutedElements = (_nodes, _edges, direction = 'TB') => {

    const isHorizontal = direction === 'LR';
    dagreGraph.setGraph({ rankdir: direction });

    _nodes.forEach((node) => {
        dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    _edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    _nodes.forEach((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);
        node.targetPosition = isHorizontal ? 'left' : 'top';
        node.sourcePosition = isHorizontal ? 'right' : 'bottom';
        node.position = {
            x: nodeWithPosition.x - nodeWidth / 2,
            y: nodeWithPosition.y - nodeHeight / 2,
        };
        return node;
    });
    return { layoutedNodes: _nodes, layoutedEdges: _edges };
};


function DrawFlow({data}) {
    const flowNodes = generateNodes(data);
    const flowEdges = generateEdges(data);
    const { layoutedNodes, layoutedEdges } = getLayoutedElements(
        flowNodes,
        flowEdges,
        "LR"
    );
    const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
    const [edges, setEdges] = useEdgesState(layoutedEdges);
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
            </ReactFlow>
        </>
    );
}

export default DrawFlow;