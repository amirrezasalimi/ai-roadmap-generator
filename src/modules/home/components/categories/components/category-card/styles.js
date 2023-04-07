import { styled } from '@nextui-org/react';

export const ComponentWithStyle = styled("div", {
    minWidth: 150,
    padding: 8,
    justifyContent: "center",
    position: "relative",
    minHeight: 200,
    cursor: "pointer",
    borderRadius: 5,
    border: '1px solid $borderColor',
    flexDirection: "column",
    textAlign: "center",
    background: "$paper",
    display: "flex",
    alignItems: "center",
    '.iconContainer': {
        position: "relative",
        '.icon': {

        },
        '.gradient': {
            bottom: 0,
            height: 64,
            position: "absolute",
            width: "100%",
            backgroundImage: "linear-gradient(rgb(20 20 20 / 58%), rgb(20 20 20))"
        },
    },
    ".textContainer": {
        top: 45,
        margin: "0 auto",
        ".text": {
            minHeight: 40,
            textAlign: "center",
        },
        ".count": {
            textAlign: "center",
            "span": {
                color: "#515151"
            }
        }
    }
});

export default ComponentWithStyle;