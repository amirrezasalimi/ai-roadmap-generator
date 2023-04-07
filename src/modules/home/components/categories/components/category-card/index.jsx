import ComponentWithStyle from "./styles";
import Image from "next/image";
import {Text} from "@nextui-org/react";
import Link from "next/link";
import makeUrl from "@/shared/helper/make-url";
import {LINKS} from "@/shared/constants/links";

const CategoryCard = ({data}) => {
  return (
    <ComponentWithStyle>
          <Link href={makeUrl(LINKS.CATEGORY, {slug: data.slug})}>
              <div className={"iconContainer"}>
                  <Image className={"icon"} alt="back" height={60} width={60} src={`category-icon/${data.slug}.svg`} />
                  <div className={"gradient"} />
              </div>
              <div className={"textContainer"}>
                  <Text size={16} className={"text"}>
                      {data.title}
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
