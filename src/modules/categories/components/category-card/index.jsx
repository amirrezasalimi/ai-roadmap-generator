import ComponentWithStyle from "./styles";
import Image from "next/image";
import {Text} from "@nextui-org/react";

const CategoryCard = () => {
  return (
    <ComponentWithStyle>
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
    </ComponentWithStyle>
  )
};
export default CategoryCard;
