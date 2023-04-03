import ComponentWithStyle from "./styles";
import {Row, Spacer} from "@nextui-org/react";
import Logo from "@/shared/components/logo";

const Categories = () => {

  return (
    <ComponentWithStyle>
      <Spacer y={2} />
      <Row justify={'center'}>
        <Logo size={"lg"} />
      </Row>
    </ComponentWithStyle>
  )
};
export default Categories;
