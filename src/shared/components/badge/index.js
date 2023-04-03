import { Badge as NextBadge, styled } from '@nextui-org/react';

const Badge = styled(NextBadge, {
      borderRadius: 5,
        variants: {
            color: {
                primary: {
                    'span': {
                        color: "$primaryLight",
                        background: "$primaryDark",
                        border: '1px solid $primaryDark'
                    }
                }
            },

        }
    });

export default Badge;