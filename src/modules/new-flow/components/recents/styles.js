import { styled } from '@nextui-org/react';



export const ComponentWithStyle = styled('div', {
    height: '100%',
    display: "flex",
    ".list": {
        display: "flex",
        flexDirection: "column",
        overflowY: "scroll",
        gap: 12,
        paddingRight: 6,
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
            ".text": {
                textAlign: "justify",
                color: "$secondaryText"
            }
        },

        "&::-webkit-scrollbar": {
            width: 4,
        },

        "&::-webkit-scrollbar-track": {
            background: "unset"
        },

        "&::-webkit-scrollbar-thumb": {
            background: "#1A1A25",
            borderRadius: 8
        },
        "&::-webkit-scrollbar-thumb:hover": {
            background: "#555",
        },
    }
});

export default ComponentWithStyle;