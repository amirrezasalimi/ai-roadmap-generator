import { styled } from '@nextui-org/react';



export const ComponentWithStyle = styled('div', {
    height: '100%',
    'form': {
        height: "100%"
    },
    '.formContainer': {
        height: "100%",
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        "& label": {
            color: '$tertiaryText'
        }
    },
    '.submitButton': {
        background: '$gradient',
        boxShadow: '',
    },
});

export default ComponentWithStyle;