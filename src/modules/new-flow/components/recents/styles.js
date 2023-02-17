import { styled } from '@nextui-org/react';



export const ComponentWithStyle = styled('div', {
    height: '100%',
    display: "flex",
    ".list": {
        display: "flex",
        flexDirection: "column",
        overflowY: "scroll",
        gap: 12,
        "a": {
            width: "100%",
        },
        ".item": {
            padding: 8,
            alignItems: "center",
            textAlign: "center",
            width: "100%",
            border: "2px solid #1A1A25",
            borderRadius: 8,
            display: "flex",
            ".icon": {
                marginRight: 8
            },
            "p": {
                color: "$secondaryText",
            }
        }
    }
});

export default ComponentWithStyle;