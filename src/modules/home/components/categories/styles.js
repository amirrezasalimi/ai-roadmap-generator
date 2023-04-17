import { styled } from '@nextui-org/react';



export const ComponentWithStyle = styled('div', {
    height: '100%',
    display: "flex",
    ".seeAll": {
        marginRight: 4
    },
    ".list": {
        display: "flex",
        flexDirection: "row",
        overflowX: "scroll",
        overflowY: "hidden",
        gap: 8,
        paddingBottom: 6,
        "a": {
            width: "100%",
        },
        ".item": {
            padding: 8,
            width: 140,
            height: 140,
            alignItems: "center",
            textAlign: "center",
            background: "#121212",
            justifyContent: "center",
            gap: 8,
            border: "2px solid #343434",
            borderRadius: 8,
            display: "flex",
            flexDirection: "column",
            ".icon": {

            },
            ".text": {
                textAlign: "center",
            },
            ".count": {
                textAlign: "center",
                "span": {
                    color: "#515151"
                }
            }
        },
        "&::-webkit-scrollbar": {
            width: 4,
            height: 4
        },
        "&::-webkit-scrollbar-track": {
            background: "unset"
        },
        "&::-webkit-scrollbar-thumb": {
            background: "#343434",
            borderRadius: 8
        },
        "&::-webkit-scrollbar-thumb:hover": {
            background: "#555",
        },
    }
});

export default ComponentWithStyle;