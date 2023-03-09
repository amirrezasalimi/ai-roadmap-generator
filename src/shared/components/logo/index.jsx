import ComponentWithStyle from "./styles";
import {Text} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import {LINKS} from "@/shared/constants/links";

const Logo = (props) => {
    const className = props.size === 'lg' ? "large" : "medium";
    return (
        <ComponentWithStyle className={className}>
          <Link href={LINKS.NEW_ROADMAP}>
              <Image alt="logo" height={0} width={0} src={'/logo.svg'} />
              <Text span>
                  Ai Roadmap
                  <Text
                      weight="bold"
                      css={{
                          textGradient: "$gradientText",
                          ml:"$4"
                      }}
                      span>
                       Generator
                  </Text>
              </Text>
          </Link>
        </ComponentWithStyle>
    )
};
export default Logo;
