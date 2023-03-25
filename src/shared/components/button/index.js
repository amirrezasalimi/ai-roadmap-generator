import { Button as NextButton, styled } from '@nextui-org/react';

const Button = styled(NextButton, {
      borderRadius: 8,
      borderColor: "$borderColor",
      color: "#fff",
      minWidth: 'unset !important',
      variants: {
          color: {
              primary: {
                  borderColor: "$borderColor",
                  color: "#fff",
              }
          },
          bordered: {
              true: {
                  border: "1px solid $borderColor",
                  color: "#fff",
              }
          }
      }
    });

export default Button;