import { styled } from '@nextui-org/react';
export const ComponentWithStyle = styled('div', {
    '.buttonLinkContainer': {
        justifyContent: "center",
        gap: 16,
        marginTop: 32,
        "& button": {
            maxWidth: 188,
            flex: 1,
        },
        '.icon': {
            marginRight: 12
        },
    },
    '.note': {
        margin: 'auto',
        color: '#515151',
        padding: 12,
        fontSize: 16,
        textAlign: "center"
    },
});

export default ComponentWithStyle;