import {Container, styled} from '@nextui-org/react';

export const ComponentWithStyle = styled(Container, {
    '.backButton': {
        height: '56px',
        'icon': {

        }
    },
    '.title': {
        marginLeft: 16,
        fontSize: "18px",
        fontWeight: "bold"
    }
});

export default ComponentWithStyle;