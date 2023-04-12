import {Container, styled} from '@nextui-org/react';

export const ComponentWithStyle = styled(Container, {
    '.backButton': {
        height: '56px',
        'icon': {

        }
    },
    '.headerCategory': {
        minHeight: 120,
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        "@xs": {
            margin: "auto",
            flexDirection: "column",
        },
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