import {styled} from '@nextui-org/react';

export const ComponentWithStyle = styled('div', {
    display: "flex",
    width: "100vw",
    padding: 12,
    flexDirection: "column",
    justifyContent: "center",
    "@sm": {
        padding: 0,
        minHeight: `100vh`,
    },
    '.categories': {
        alignContent: "center",
        justifyContent: "center",
    },
    '.content': {
        gap: 12,
        alignContent: "center",
        justifyContent: "center",
    },
    '.title': {

    },
    '.box': {
        margin: 'auto',
        width: '100%',
        height: '420px'
    },
    '.gradient1': {
        "@md": {
            bottom: 0,
            right: 0,
            position: 'absolute',
            width: 439,
            height: 439,
            background: '#7A008E',
            mixBlendMode: 'normal',
            filter: 'blur(400px)',
            pointerEvents: "none",
        }
    },
    '.gradient2': {
       "@md": {
           top: 0,
           left: 0,
           position: 'absolute',
           width: 439,
           height: 439,
           background: '#7A008E',
           mixBlendMode: 'normal',
           filter: 'blur(400px)',
           pointerEvents: "none"
       }
    },
});

export default ComponentWithStyle;