import { styled } from '@nextui-org/react';
export const ComponentWithStyle = styled('div', {
    top: 0,
    right: 0,
    zIndex: 10,
    width: "100%",
    position: "fixed",
    background: "#171717",
    ".main": {
        flex: 1,
        height: 'fit-content',
        padding: 16,
        display: "flex",
        justifyContent: "space-between",
        ".btn": {
            marginLeft: 12,
        },
        ".svgIcon": {
            marginRight: 12
        },
        borderBottom: "1px solid #1D1D1D",
    },
    ".content": {
        overflowX: "hidden",
        overflowY: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 100,
        padding: 16,
        "@md": {
            overflowX: "hidden",
            overflowY: "hidden",
            marginInline: 100,
        },
        borderBottom: "1px solid #1D1D1D",

        ".downloadBtn": {
            border: "solid 1px white",
            marginLeft:8,
            "@xsMax": {
                display: "none"
            }
        },
        ".likeItem": {
            marginInline: 8
        },
        ".share": {
            display: "none",
            "@xs": {
                display: "flex",
                ".shareTitle": {
                    marginRight: 8,
                    alignSelf: "center",
                    color: '#757475'
                },
                ".shareItem": {
                    marginInline: 8
                },
            }
        },
        ".title": {
            marginRight: 12,
            flex: 1,
            display: "flex",
            alignItems: "center",
            height: "100%",
            ":first-child": {
                marginRight: 6,
                color: '#757475',
                "@xsMax": {
                    display: "none",
                }
            }
        }
    },
    '.submitButton': {
        background: '$gradient',
        boxShadow: '',
    },
});

export default ComponentWithStyle;