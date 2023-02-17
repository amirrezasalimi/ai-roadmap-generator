import React, { memo } from 'react';
import { Handle } from 'reactflow';
import styles from './styles.module.css';
import clsx from 'clsx';

export default memo(({ data: {label, level, clone}, sourcePosition, targetPosition, ...props }) => {

    const returnClassName = () => {
        if(clone){
            return [styles.nodeClone]
        }
        else if(level === 0){
            return [styles.nodeLevel0]
        }
        else if(level === 1){
            return [styles.nodeLevel1]
        }
        else {
            return [styles.nodeOtherLevel]
        }
    }

    const returnHandleClassName = (position) => {
        if(position === sourcePosition || position === targetPosition){
            return styles.handle
        }
        else {
            return  styles.handleDeActive
        }
    }

    return (
        <div className={clsx(returnClassName())}>
            {label}
            <Handle className={returnHandleClassName("top")} type="source" position="top" id="a" />
            <Handle className={returnHandleClassName("right")} type="source" position="right" id="b" />
            <Handle className={returnHandleClassName("bottom")} type="source" position="bottom" id="c" />
            <Handle className={returnHandleClassName("left")} type="source" position="left" id="d" />
        </div>
    );
});
