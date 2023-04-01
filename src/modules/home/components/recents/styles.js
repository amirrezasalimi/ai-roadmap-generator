import { styled } from '@nextui-org/react';



export const ComponentWithStyle = styled('div', {
    height: '100%',
    display: "flex",
    ".list": {
        display: "flex",
        flexDirection: "column",
        overflowY: "scroll",
        overflowX: "hidden",
        gap: 12,
        paddingRight: 6,

        "&::-webkit-scrollbar": {
            width: 4,
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