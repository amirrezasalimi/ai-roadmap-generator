import ComponentWithStyle from "./styles";
import {Text} from "@nextui-org/react";
import Image from "next/image";

const Logo = (props) => {
    const className = props.size === 'lg' ? "large" : "medium";
    return (
        <ComponentWithStyle className={className}>
            <Image alt="logo" height={0} width={0} src={'/logo.svg'} />
            <Text span>
                Ai Roadmap
                <Text
                    weight="bold"
                    css={{
                        textGradient: "$gradientText",
                    }}
                    span>
                    Generator
                </Text>
            </Text>
        </ComponentWithStyle>
    )
};
export default Logo;
