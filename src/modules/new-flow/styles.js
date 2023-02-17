import { styled } from '@nextui-org/react';



export const ComponentWithStyle = styled('div', {
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        height: `100vh`,
        '.content': {
          gap: 12,
          justify: "center",
          alignContent: "center",
          justifyContent: "center",
        },
        '.hint': {
            color: '$secondaryText'
        },
        '.box': {
            margin: 'auto',
            width: '100%'
        },
        '.card': {
            display: "flex",
            flexDirection: "column",
            gap: 12,
            padding: 16,
            borderRadius: 10,
            background: "#000F1C"
        },
        '.formContainer': {
            gap: 12,
            display: 'flex',
            flexDirection: 'column',
            "& label": {
                color: '$tertiaryText'
            }
        },
        '.submitButton': {
            background: '$gradient',
            boxShadow: '',
        },
        '.buttonLinkContainer': {
            justifyContent: "space-between",
            gap: 16,
            marginTop: 16,
            "& button": {
                flex: 1,
            }
        },
        '.footer': {
            position: "absolute",
            bottom: 16,
        },
        '.gradient1': {
            bottom: 0,
            right: 0,
            position: 'absolute',
            width: 439,
            height: 439,
            background: '#7A008E',
            mixBlendMode: 'normal',
            filter: 'blur(300px)'
        },
        '.gradient2': {
            top: 0,
            left: 0,
            position: 'absolute',
            width: 439,
            height: 439,
            background: '#7A008E',
            mixBlendMode: 'normal',
            filter: 'blur(300px)'
        },
    });

export default ComponentWithStyle;