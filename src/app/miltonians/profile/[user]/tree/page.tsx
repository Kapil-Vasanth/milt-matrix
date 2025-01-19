"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useCallback } from 'react';
import {
    ConnectionLineType,
    ReactFlow,
    addEdge,
    useEdgesState,
    useNodesState,
} from '@xyflow/react';
import CustomNode from '@/app/components/CustomNode';
import { initialEdges, initialNodes } from '@/app/miltonians/profile/[user]/tree/initialElements';
import dagre from '@dagrejs/dagre';



const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));


const nodeTypeExample = () => {
    return (
        <h1>Testing</h1>
    )
}

const nodeTypes = { textUpdater: nodeTypeExample, customNode: CustomNode };



const nodeWidth = 172;
const nodeHeight = 36;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getLayoutedElements = (nodes: any[], edges: any[], direction = 'TB') => {
    const isHorizontal = direction === 'LR';
    dagreGraph.setGraph({ rankdir: direction });
   
    nodes.forEach((node) => {
      dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });
   
    edges.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target);
    });
   
    dagre.layout(dagreGraph);
   
    const newNodes = nodes.map((node) => {
      const nodeWithPosition = dagreGraph.node(node.id);
      const newNode = {
        ...node,
        targetPosition: isHorizontal ? 'left' : 'top',
        sourcePosition: isHorizontal ? 'right' : 'bottom',
        // We are shifting the dagre node position (anchor=center center) to the top left
        // so it matches the React Flow node anchor point (top left).
        position: {
          x: nodeWithPosition.x - nodeWidth / 2,
          y: nodeWithPosition.y - nodeHeight / 2,
        },
      };
   
      return newNode;
    });
   
    return { nodes: newNodes, edges };
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    initialNodes,
    initialEdges,
  );


export default function Tree() {

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback(
        (params: any) =>
          setEdges((eds) =>
            addEdge(
              { ...params, type: ConnectionLineType.SmoothStep, animated: true },
              eds,
            ),
          ),
        [],
      );

    const onLayout = useCallback(
        (direction: string | undefined) => {
          const { nodes: layoutedNodes, edges: layoutedEdges } =
            getLayoutedElements(nodes, edges, direction);
     
          setNodes([...layoutedNodes]);
          setEdges([...layoutedEdges]);
        },
        [nodes, edges],
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
                    connectionLineType={ConnectionLineType.SmoothStep}
                    fitView
                />
            </div>
        </div>
    )
}