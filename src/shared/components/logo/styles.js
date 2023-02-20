import { styled } from '@nextui-org/react';
export const ComponentWithStyle = styled('div', {
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'center',
    'a': {
      display: 'flex'
    },
    "&.medium": {
        'span': {
            fontSize: 14,
            "@xs": {
                fontSize: 20,
            },
            "@sm": {
                fontSize: 24,
            },
        },
        'img': {
            marginRight: 8,
            height: 20,
            width: 20,
            "@xs": {
                height: 24,
                width: 24,
            },
        },
    },
    "&.large": {
        'span':{
            fontSize: 28,
            "@xs": {
                fontSize: 42,
            },
            "@sm": {
                fontSize: 60,
            },
        },
        'img': {
            marginRight: 8,
            height: 30,
            width: 30,
            "@xs": {
                height: 50,
                width: 50,
            },
        },

    }

});

export default ComponentWithStyle;