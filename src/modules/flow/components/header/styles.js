import { styled } from '@nextui-org/react';
export const ComponentWithStyle = styled('div', {
    top: 0,
    right: 0,
    zIndex: 10,
    width: "100%",
    position: "fixed",
    background: "#0A0A0A",
    ".main": {
        flex: 1,
        height: 'fit-content',
        padding: 16,
        display: "flex",
        justifyContent: "space-between",
        ".githubButton" : {
            marginLeft: 12
        },
        ".githubSvg" : {
            marginRight: 12
        },
        borderBottom: "1px solid #1D1D1D",
    },
    ".content": {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 100,
        padding: 16,
        marginInline: 100,
        borderBottom: "1px solid #1D1D1D",
        ".share": {
            display: "flex",
            ".shareTitle": {
                marginRight: 12,
                alignSelf: "center",
                color: '#757475'
            },
            ".shareItem": {
                marginInline: 6
            },
        },
        ".title": {
          color: '#757475'
        }
    },
    '.submitButton': {
        background: '$gradient',
        boxShadow: '',
    },
});

export default ComponentWithStyle;