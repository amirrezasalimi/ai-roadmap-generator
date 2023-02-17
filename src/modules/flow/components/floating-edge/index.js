import { useCallback } from 'react';
import {useStore, getSmoothStepPath} from 'reactflow';
import { getEdgeParams } from '../../helpers/position';
import styles from './styles.module.css';
import clsx from 'clsx';

function FloatingEdge({ id, source, target, markerEnd, style, data, ...props }) {
    const sourceNode = useStore(useCallback((store) => store.nodeInternals.get(source), [source]));
    const targetNode = useStore(useCallback((store) => store.nodeInternals.get(target), [target]));

    if (!sourceNode || !targetNode) {
        return null;
    }
    let resultSx, resultSy, resultTx, resultTy, resultSourcePos, resultTargetPos;
    if(data?.locked) {
        resultSx = props.sourceX;
        resultSy = props.sourceY;
        resultTx = props.targetX;
        resultTy = props.targetY;
        resultSourcePos = props.sourcePosition;
        resultTargetPos = props.targetPosition;
    }
    else {
        const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(sourceNode, targetNode);
        resultSx = sx;
        resultSy = sy;
        resultTx = tx;
        resultTy = ty;
        resultSourcePos = sourcePos;
        resultTargetPos = targetPos;
    }

    const returnClassName = () => {
        if(data.clone){
            return ['react-flow__edge-path', styles.edgeClone]
        }
        else if(data.level === 0 || data.level === 1) {
            return ['react-flow__edge-path', styles.baseEdge]
        }
        return ['react-flow__edge-path', styles.otherEdge]
    }

//  const [edgePath, labelX, labelY, offsetX, offsetY]
    const [edgePath] = getSmoothStepPath({
        sourceX: resultSx,
        sourceY: resultSy,
        sourcePosition: resultSourcePos,
        targetPosition: resultTargetPos,
        targetX: resultTx,
        targetY: resultTy,
        borderRadius: 0,
        offset: 20
    });

    return (
        <>
            <path
                id={id}
                className={clsx(returnClassName())}
                d={edgePath}
                strokeWidth={5}
                markerEnd={markerEnd}
                style={style}
            />
            {/*<path d={`M ${labelX} ${labelY} m -40, 0 a 40,40 0 1,0 80,0 a 40,40 0 1,0 -80,0`} stroke="#fff" fill="transparent" />*/}
        </>
    );
}

export default FloatingEdge;
