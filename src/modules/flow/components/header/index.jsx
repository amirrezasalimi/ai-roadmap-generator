import ComponentWithStyle from "./styles";
import Button from "@/shared/components/button";
import Image from "next/image";
import Logo from "@/shared/components/logo";
import { Row, Spacer, Text } from "@nextui-org/react";
import toast from "@/shared/components/toast";
import Link from "next/link";
import APP from "@/shared/constants/app";
import { LINKS } from "@/shared/constants/links";
import copyToClipboard from "@/shared/helper/copy-clipboard";
import useLike from "@/modules/flow/hooks/like-roadmap";

const Header = ({ data }) => {
    const link = typeof window !== "undefined" ? window?.location?.href : "";
    const hookLike = useLike(data?.is_liked, data?.id, data?.likes);
    const onClickLike = () => {
        if (hookLike.data.isLiked) {
            hookLike.disLikeAction();
        } else {
            hookLike.likeAction();
        }
    }
    return (
        <ComponentWithStyle>
            <div className={"main"}>
                <Row>
                    <Logo size={"md"} />
                    <Link target={"_blank"} href={APP.GITHUB_LINK}>
                        <Button color={"default"} className={"btn"} size={'md'}>
                            <Image className={"svgIcon"} alt="github" height={20} width={20} src={'/github.svg'} />
                            <span>
                                github
                            </span>
                        </Button>
                    </Link>
                   
                    <Link target={"_blank"} href={APP.DISCORD_LINK}>
                        <Button color={"default"} className={"btn"} size={'md'}>
                            <Image className={"svgIcon"} alt="discord" height={20} width={20} src={'/discord.svg'} />
                            <span>
                                discord
                            </span>
                        </Button>
                    </Link>

                </Row>
                <div>
                    <Link href={LINKS.NEW_ROADMAP}>
                        <Button
                            color={"default"}
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
                        {data?.title}
                    </Text>
                </div>
                <div className={"share"}>
                    <Text className={"shareTitle"} span>
                        Share page
                    </Text>
                    <Button
                        color={"default"}
                        onClick={() => {
                            copyToClipboard(link);
                            toast.success("link copied!");
                        }}
                        className={"shareItem"}>
                        <Image className={"githubSvg"} alt="github" height={20} width={20} src={'/copy.svg'} />
                    </Button>
                    <a target={"blank"} href={`https://twitter.com/share?text=${link}`}>
                        <Button color={"default"} className={"shareItem"}>
                            <Image className={"githubSvg"} alt="github" height={20} width={20} src={'/twitter.svg'} />
                        </Button>
                    </a>
                    <a
                        target={"blank"}
                        href={`https://www.linkedin.com/shareArticle?mini=true&url=${link}&title=${data.title}`}
                    >
                        <Button color={"default"} className={"shareItem"}>
                            <Image className={"githubSvg"} alt="github" height={20} width={20} src={'/linkdin.svg'} />
                        </Button>
                    </a>
                </div>
                <Button onClick={onClickLike} color={"default"} className={"shareItem"}>
                    {hookLike.data.isLiked ?
                        <Image className={"githubSvg"} alt="github" height={20} width={20} src={'/heart.svg'} />
                        : <Image className={"githubSvg"} alt="github" height={20} width={20} src={'/heart-empty.svg'} />
                    }
                    <Spacer x={.5} />
                    {hookLike.data.likeCount}
                </Button>
            </div>
        </ComponentWithStyle>
    )
};
export default Header;
