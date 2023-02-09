import React, { memo } from 'react';
import { Handle } from 'reactflow';
import styles from './styles.module.css';


export default memo(({ data }) => {
    return (
        <div className={styles.nodeCustom}>
            {data.label}
            <Handle type="source" position="top" id="a" />
            <Handle type="source" position="right" id="b" />
            <Handle type="source" position="bottom" id="c" />
            <Handle type="source" position="left" id="d" />
        </div>
    );
});
