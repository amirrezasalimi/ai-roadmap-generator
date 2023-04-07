import ComponentWithStyle from "./styles";
import Button from "@/shared/components/button";
import Image from "next/image";
import Logo from "@/shared/components/logo";
import {Row, Text} from "@nextui-org/react";
import toast from "@/shared/components/toast";
import Link from "next/link";
import APP from "@/shared/constants/app";
import {LINKS} from "@/shared/constants/links";
import copyToClipboard from "@/shared/helper/copy-clipboard";
const Header = (props) => {
    const link = typeof window !== "undefined" ? window?.location?.href : "";
    return (
        <ComponentWithStyle>
            <div className={"main"}>
                <Row>
                    <Logo size={"md"} />
                    <Link target={"_blank"} href={APP.GITHUB_LINK}>
                        <Button className={"githubButton"} size={'md'}>
                            <Image className={"githubSvg"} alt="github" height={20} width={20} src={'/github.svg'}/>
                            <span>
                            github
                        </span>
                        </Button>
                    </Link>
                </Row>
                <div>
                  <Link href={LINKS.NEW_ROADMAP}>
                      <Button
                          className="submitButton"
                          size={'md'}
                          type="submit">
                          Generate
                      </Button>
                  </Link>
                </div>
            </div>
            <div className={"content"}>
                <div className={"title"}>
                    <Text span>
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
