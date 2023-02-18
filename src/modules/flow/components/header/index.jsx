import ComponentWithStyle from "./styles";
import Button from "@/shared/components/button";
import Image from "next/image";
import Logo from "@/shared/components/logo";
import {Row, Text} from "@nextui-org/react";
import copyToClipboard from "@/shared/hooks/copy_clipboard";
import toast from "@/shared/components/toast";
const Header = (props) => {
    const link = typeof window !== "undefined" ? window?.location?.href : "";
    return (
        <ComponentWithStyle>
            <div className={"main"}>
                <Row>
                    <Logo size={"md"} />
                    <Button className={"githubButton"} size={'md'}>
                        <Image className={"githubSvg"} alt="github" height={20} width={20} src={'/github.svg'}/>
                        <span>
                            github
                        </span>
                    </Button>
                </Row>
                <div>
                    <Button
                        className="submitButton"
                        size={'md'}
                        type="submit">
                        Generate
                    </Button>
                </div>
            </div>
            <div className={"content"}>
                <div>
                    <Text className={"title"} span>
                        {'Description: '}
                    </Text>
                    <Text span>
                        {props?.title}
                    </Text>
                </div>
                <div className={"share"}>
                    <Text className={"shareTitle"} span>
                        Share page
                    </Text>
                    <Button
                        onClick={() => {
                            copyToClipboard(link);
                            toast.success("link copied!");
                        }}
                        className={"shareItem"}>
                        <Image className={"githubSvg"} alt="github" height={20} width={20} src={'/copy.svg'}/>
                    </Button>
                    <a target={"blank"} href={`https://twitter.com/share?text=${link}`}>
                        <Button className={"shareItem"}>
                            <Image className={"githubSvg"} alt="github" height={20} width={20} src={'/twitter.svg'}/>
                        </Button>
                    </a>
                    <a
                        target={"blank"}
                        href={`https://www.linkedin.com/shareArticle?mini=true&url=${link}&title=${props.title}`}
                    >
                        <Button className={"shareItem"}>
                            <Image className={"githubSvg"} alt="github" height={20} width={20} src={'/linkdin.svg'}/>
                        </Button>
                    </a>
                </div>
            </div>
        </ComponentWithStyle>
    )
};
export default Header;
