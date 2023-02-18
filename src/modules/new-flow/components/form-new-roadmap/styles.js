import { styled } from '@nextui-org/react';



export const ComponentWithStyle = styled('div', {
    height: '100%',
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
});

export default ComponentWithStyle;