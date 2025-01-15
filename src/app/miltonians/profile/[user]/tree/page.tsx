"use client";
import { useCallback } from 'react';
import {
    ReactFlow,
    addEdge,
    useEdgesState,
    useNodesState,
} from '@xyflow/react';
import CustomNode from '@/app/components/CustomNode';

const initialNodes = [
    { id: '1', type: 'textUpdate', position: { x: 350, y: 20 }, data: { label: 'Dad' } },
    { id: '2', position: { x: 450, y: 100 }, data: { label: 'Mom' } },
    { id: '3', position: { x: 90, y: 200 }, data: { label: 'Son' } },
    { id: '4', position: { x: 290, y: 200 }, data: { label: 'Daughter' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }, { id: 'e1-3', source: '1', target: '3' }, { id: 'e1-4', source: '1', target: '4' }];

const nodeTypeExample = () => {
    return (
        <h1>Testing</h1>
    )
}

const nodeTypes = { textUpdater: nodeTypeExample, customNode: CustomNode };


export default function Tree() {

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback(
        (connection: any) => setEdges((eds) => addEdge(connection, eds)),
        [setEdges],
    );

    return (
        <div >
            <h1 className="text-xl font-semibold">Family Tree</h1>
            <div className="border w-[800px] h-[400px]">
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    nodeTypes={nodeTypes}
                    fitView
                />
            </div>
        </div>
    )
}