import ComponentWithStyle from "./styles";
import Image from "next/image";
import {Text} from "@nextui-org/react";
import Link from "next/link";
import makeUrl from "@/shared/helper/make-url";
import {LINKS} from "@/shared/constants/links";

const CategoryCard = () => {
  return (
    <ComponentWithStyle>
          <Link href={makeUrl(LINKS.CATEGORY, {id: 10})}>
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
          </Link>
    </ComponentWithStyle>
  )
};
export default CategoryCard;
