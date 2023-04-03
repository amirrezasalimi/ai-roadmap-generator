import ComponentWithStyle from "./styles";
import {Row, Spacer, Text} from "@nextui-org/react";
import Logo from "@/shared/components/logo";
import Button from "@/shared/components/button";
import Image from "next/image";
import {useRouter} from "next/navigation";
const CategoryItem = () => {
  const router = useRouter();
  const backEvent = () => {
      router.back()
  }
  return (
    <ComponentWithStyle md>
      <Spacer y={2} />
      <Row justify={'center'}>
        <Logo size={"lg"} />
      </Row>
      <Spacer y={2} />
      <Row justify={"space-between"}>
          <Button onClick={backEvent} className={"backButton"} color={"default"} bordered>
              <Image className={"icon"} alt="back" height={25} width={25} src={'arrow-left.svg'} />
          </Button>
          <div className={"headerCategory"}>
              <div className={"iconContainer"}>
                  <Image className={"icon"} alt="back" height={60} width={60} src={'category-icon/product-management.svg'} />
                  <div className={"gradient"} />
              </div>
              <div className={"textContainer"}>
                  <Text size={16} className={"text"}>
                      Product management
                  </Text>
                  <Text size={16} className={"count"}>
                      12 <span>/Roadmap</span>
                  </Text>
              </div>
          </div>
      </Row>
    </ComponentWithStyle>
  )
};
export default CategoryItem;
