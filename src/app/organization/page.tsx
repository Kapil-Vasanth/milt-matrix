
"use client";
import React, { useCallback } from 'react';
import {
    Background,
    ReactFlow,
    useNodesState,
    useEdgesState,
    addEdge,
    Controls,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
const initialNodes = [
    {
        id: 'hidden-1',
        type: 'input',
        data: { label: 'Chairman' },
        position: { x: 250, y: 5 },
    },
    { id: 'hidden-2', data: { label: 'President' }, position: { x: 100, y: 100 } },
    { id: 'hidden-3', data: { label: 'Vice President' }, position: { x: 400, y: 100 } },
    { id: 'hidden-4', data: { label: 'ECT Committee' }, position: { x: 400, y: 200 } },
];

const initialEdges = [
    { id: 'hidden-e1-2', source: 'hidden-1', target: 'hidden-2' },
    { id: 'hidden-e1-3', source: 'hidden-1', target: 'hidden-3' },
    { id: 'hidden-e3-4', source: 'hidden-3', target: 'hidden-4' },
];


const Organization = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    
    const onConnect = useCallback(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (params: any) => setEdges((els) => addEdge(params, els)),
        [],
    );

   
    return (
        <div className="flex flex-col gap-y-2 w-full">
            <h1 className="truncate text-2xl font-medium tracking-tight mb-2">About Milt Organziation</h1>
            <p className="text-base text-secondary mb-2">
                MILT Charitable Trust Bangalore, is involved in various social initiatives. Founded by <b>Aporesh Acharya</b> in 1977, the organization has grown to include numerous Miltonians who are graduates of the MILT Leadership Course. These individuals contribute to social projects such as Snehalaya, which is a home for destitute boys from economically weak families. The Snehalaya project was initiated in 1991 and aims to provide a nurturing environment for these children, helping them to thrive and build a better future.
            </p>

            <div className='border w-full  h-[400px] lg:h-[500px]'>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    fitView
                    style={{ backgroundColor: "#F7F9FB" }}
                >
                    <Controls />

                    
                    <Background />
                </ReactFlow>
            </div>
        </div>
    );
}

export default Organization;