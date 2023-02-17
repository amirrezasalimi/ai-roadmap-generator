import React, { memo } from 'react';
import { Handle } from 'reactflow';
import styles from './styles.module.css';
import clsx from 'clsx';
import {log} from "util";

export default memo(({ data: {label, level}, sourcePosition, targetPosition, ...props }) => {
    let classNames = [];
    if(level === 0){
        classNames.push(styles.nodeCustomLevel0);
    }
    else if(level === 1){
        classNames.push(styles.nodeCustomLevel1);
    }
    else {
        classNames.push(styles.nodeCustomLevelOthers);
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
        <div className={clsx(classNames)}>
            {label}
            <Handle className={returnHandleClassName("top")} type="source" position="top" id="a" />
            <Handle className={returnHandleClassName("right")} type="source" position="right" id="b" />
            <Handle className={returnHandleClassName("bottom")} type="source" position="bottom" id="c" />
            <Handle className={returnHandleClassName("left")} type="source" position="left" id="d" />
        </div>
    );
});
