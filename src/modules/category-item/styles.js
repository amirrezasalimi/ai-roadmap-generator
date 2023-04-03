import {Container, styled} from '@nextui-org/react';

export const ComponentWithStyle = styled(Container, {
    '.backButton': {
        height: '56px',
        'icon': {

        }
    },
    '.headerCategory': {
        flexDirection: "row",
        "@xs": {
            margin: "auto",
            flexDirection: "column",
        },
        display: "flex",
        alignItems: "center",

        '.iconContainer': {
            position: "relative",
            '.icon': {
                color: 'red',
            },
            '.gradient': {
                bottom: 0,
                height: 64,
                position: "absolute",
                width: "100%",
                backgroundImage: "linear-gradient(rgb(12 12 12 / 46%), rgb(12, 12, 12))"
            },
        },
        ".textContainer": {
            top: 45,
            "@xsMax": {
                marginLeft: 12,
            },
            "@xs": {
                position: "absolute",
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
        }
    }
});

export default ComponentWithStyle;