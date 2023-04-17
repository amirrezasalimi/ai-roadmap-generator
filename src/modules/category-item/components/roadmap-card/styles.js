import {styled} from '@nextui-org/react';


export const ComponentWithStyle = styled('fragment', {
    width: "100%",
    height: 110,
    border: "1px solid #343434",
    borderRadius: 8,
    background: "$paper",
    ".content": {
        justifyContent: "flex-start",
        padding: 16,
        height: 76,
        width: "100%",
        display: "flex",
        borderBottom: "1px solid #343434",
        ".text": {
            display: "-webkit-box",
            overflow: "hidden",
            textOverflow: "ellipsis",
            "-webkit-line-clamp": 2,
            "-webkit-box-orient": "vertical",
        },
        ".icon": {
            marginRight: 8
        },
    },
    ".details": {
        height: 32,
        padding: 8,
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        gap: 8,
        "@sm": {
            flexWrap: "nowrap",
            gap: 0,
        },
        justifyContent: "space-between",
        alignItems: "center",
        '.text': {
            fontSize: 14,
            color: "#515151",
            "@sm": {
                fontSize: 12,
            },
        },
    },
});

export default ComponentWithStyle;