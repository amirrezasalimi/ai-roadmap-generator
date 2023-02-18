import {styled} from '@nextui-org/react';

export const ComponentWithStyle = styled('div', {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: `100vh`,
    '.note': {
        alignContent: "center",
        justifyContent: "center",
    },
    '.content': {
        gap: 12,
        paddingInline: 12,
        alignContent: "center",
        justifyContent: "center",
    },
    '.hint': {
        color: '$secondaryText'
    },
    '.box': {
        margin: 'auto',
        width: '100%',
        height: '420px'
    },
    '.icon': {
        marginRight: 12
    },

    '.buttonLinkContainer': {
        justifyContent: "center",
        gap: 16,
        marginTop: 32,
        "& button": {
            maxWidth: 188,
            flex: 1,
        }
    },
    '.gradient1': {
        bottom: 0,
        right: 0,
        position: 'absolute',
        width: 439,
        height: 439,
        background: '#7A008E',
        mixBlendMode: 'normal',
        filter: 'blur(400px)'
    },
    '.gradient2': {
        top: 0,
        left: 0,
        position: 'absolute',
        width: 439,
        height: 439,
        background: '#7A008E',
        mixBlendMode: 'normal',
        filter: 'blur(400px)'
    },
});

export default ComponentWithStyle;