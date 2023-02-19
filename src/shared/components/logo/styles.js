import { styled } from '@nextui-org/react';
export const ComponentWithStyle = styled('div', {
    display: 'flex',
    alignItems: 'center',
    "&.medium": {
        'span':{
            fontSize: 24
        },
        'img': {
            marginRight: 8,
            height: 24,
            width: 24
        },
    },
    "&.large": {
        'span':{
            fontSize: 60
        },
        'img': {
            marginRight: 8,
            height: 50,
            width: 50
        },
    }

});

export default ComponentWithStyle;