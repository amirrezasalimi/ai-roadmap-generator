import { Textarea as NextTextarea, styled } from '@nextui-org/react';



const Textarea = styled(NextTextarea, {
      "& div": {
        borderRadius: 5,
      },
    });

export default Textarea;