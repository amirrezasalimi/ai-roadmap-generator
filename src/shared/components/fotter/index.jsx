import ComponentWithStyle from "./styles";
import {Row, Spacer, Text} from "@nextui-org/react";
import Link from "next/link";
import APP from "@/shared/constants/app";
import Button from "@/shared/components/button";
import Image from "next/image";

const Footer = () => {
    return (
        <ComponentWithStyle>
            <Row className="buttonLinkContainer">
                <Link href={APP.GITHUB_LINK}>
                    <Button bordered color={"default"} size={'lg'}>
                        <Image className={"icon"} alt="github" height={25} width={25} src={'github.svg'} />
                        github
                    </Button>
                </Link>
                <Link href={APP.FIGMA_LINK}>
                    <Button bordered color={"default"} size={'lg'}>
                        <Image className={"icon"} alt="figma" height={25} width={25} src={'figma.svg'} />
                        figma
                    </Button>
                </Link>
            </Row>
            <Spacer y={2} />
            <Text className={"note"}>
                We are using Open Ai GPT and do not refer to its data scientifically. The data is only collected by artificial intelligence.
            </Text>
            <Spacer y={2} />
        </ComponentWithStyle>
    )
};
export default Footer;
