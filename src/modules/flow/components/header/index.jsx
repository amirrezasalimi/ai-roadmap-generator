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
import { toPng } from "html-to-image";
import { ReactFlow, getRectOfNodes, getTransformForBounds, useReactFlow } from "reactflow";
import { useCallback } from "react";
import { BASE_URL } from "@/shared/constants/api-urls";

const Header = ({ data, reactFlowInstance }) => {
    const link = typeof window !== "undefined" ? window?.location?.href : "";
    const hookLike = useLike(data?.is_liked, data?.id, data?.likes);
    const onClickLike = () => {
        if (hookLike.data.isLiked) {
            hookLike.disLikeAction();
        } else {
            hookLike.likeAction();
        }
    }

    const downloadPng = useCallback(() => {
        const nodesBounds = getRectOfNodes(reactFlowInstance.getNodes());

        const viewport = document.querySelector('.react-flow__viewport');
        const width = viewport.scrollWidth;
        const height = viewport.scrollHeight;

        const centerX = nodesBounds.x + nodesBounds.width / 2;
        const centerY = nodesBounds.y + nodesBounds.height / 2;
        const scaleX = width / nodesBounds.width;
        const scaleY = height / nodesBounds.height;
        const scale = Math.min(scaleX, scaleY);

        const bgColor = "rgb(23,23,23)"
        const transform = [
            width / 2 - centerX * scale,
            height / 2 - centerY * scale,
            scale
        ];

        toPng(viewport, {
            backgroundColor: bgColor,
            width: width,
            height: height,
            pixelRatio: 4,
            style: {
                width: width,
                height: height,
                background: bgColor,
                transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
            },
        }).then(function (dataUrl) {
            var link = document.createElement('a');
            link.download = `ai-roadmap.com.png`;
            link.href = dataUrl;
            link.click();
        });
    }, [reactFlowInstance])
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
                <Button onClick={onClickLike} color={"default"} className={"likeItem"}>
                    {hookLike.data.isLiked ?
                        <Image className={"githubSvg"} alt="github" height={20} width={20} src={'/heart.svg'} />
                        : <Image className={"githubSvg"} alt="github" height={20} width={20} src={'/heart-empty.svg'} />
                    }
                    <Spacer x={.5} />
                    {hookLike.data.likeCount}
                </Button>
                <Button onClick={downloadPng} color={"default"} bordered className="downloadBtn" >
                    Download Png
                </Button>
            </div>
        </ComponentWithStyle>
    )
};
export default Header;
