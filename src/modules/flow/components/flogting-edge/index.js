import { useCallback } from 'react';
import {useStore, getSmoothStepPath} from 'reactflow';

import { getEdgeParams } from '../../helpers/position';

function FloatingEdge({ id, source, target, markerEnd, style }) {
    const sourceNode = useStore(useCallback((store) => store.nodeInternals.get(source), [source]));
    const targetNode = useStore(useCallback((store) => store.nodeInternals.get(target), [target]));

    if (!sourceNode || !targetNode) {
        return null;
    }

    const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(sourceNode, targetNode);

    const [edgePath] = getSmoothStepPath({
        sourceX: sx,
        sourceY: sy,
        sourcePosition: sourcePos,
        targetPosition: targetPos,
        targetX: tx,
        targetY: ty,
        borderRadius: 0,
        offset: 0
    });

    return (
        <path
            id={id}
            className={'react-flow__edge-path'}
            d={edgePath}
            strokeWidth={5}
            markerEnd={markerEnd}
            style={style}
        />
    );
}

export default FloatingEdge;
