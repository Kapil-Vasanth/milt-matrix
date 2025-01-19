const edgeType = 'smoothstep';

export const initialNodes = [
    { id: '1', type: 'textUpdate', position: { x: 150, y: 20 }, data: { label: 'Dad' } },
    { id: '2', position: { x: 350, y: 20 }, data: { label: 'Mom' } },
    { id: '3', position: { x: 90, y: 200 }, data: { label: 'Son' } },
    { id: '4', position: { x: 290, y: 200 }, data: { label: 'Daughter' } },
];
export const initialEdges = [
    { id: 'e1-3', source: '1', target: '3', type: edgeType, animated: true },
    { id: 'e1-4', source: '1', target: '4', type: edgeType, animated: true },
    { id: 'e2-3', source: '2', target: '3', type: edgeType, animated: true },
    { id: 'e2-4', source: '2', target: '4', type: edgeType, animated: true },
];