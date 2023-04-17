import Link from "next/link";
import Image from "next/image";
import ComponentWithStyle from "./styles";
import makeUrl from "@/shared/helper/make-url";
import { LINKS } from "@/shared/constants/links";
import  { Text } from "@nextui-org/react";
import ReactTimeAgo from "react-time-ago";

const RoadmapCard = ( { data }) => {
    return (
        <ComponentWithStyle>
            <Link target={'_blank'} key={`recent-roadmap-item-${data.code}`} href={makeUrl(LINKS.ROADMAP, {id: data.code})}>
                    <div className={"content"}>
                        <Image className={"icon"} alt="link" height={16} width={16} src={'/link.svg'}/>
                        <Text className={"text"}>
                            {data.title}
                        </Text>
                    </div>
                    <div className={"details"}>
                        <Text className={"text"}>
                            {data?.created && (
                                <ReactTimeAgo
                                    verboseDate={new Date().toISOString()}
                                    date={new Date(data?.created ?? "")}
                                    locale="en-US"
                                />
                            )}
                        </Text>
                        <Text className={"text"}>
                            {data.likes} likes
                        </Text>
                    </div>
            </Link>
        </ComponentWithStyle>
    )
};
export default RoadmapCard;
