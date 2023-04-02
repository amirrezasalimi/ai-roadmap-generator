import {styled} from '@nextui-org/react';


export const ComponentWithStyle = styled('fragment', {
    ".item": {
        width: "100%",
        border: "1px solid #343434",
        borderRadius: 8,
        ".content": {
            justifyContent: "flex-start",
            padding: 16,
            width: "100%",
            display: "flex",
            borderBottom: "1px solid #343434",
            ".text": {
                textAlign: "justify",
            },
            ".icon": {

            },
        },
        ".details": {
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
            '.category *': {
                fontSize: 12,
                "@sm": {
                    flexWrap: "nowrap",
                    fontSize: 10,
                },
            },
            '.counters': {
                display: "flex",
                alignItems: "center",
                gap: 8,
                '.text': {
                    fontSize: 14,
                    color: "#515151",
                    "@sm": {
                        fontSize: 12,
                    },
                },
            }
        },

    },
});

export default ComponentWithStyle;