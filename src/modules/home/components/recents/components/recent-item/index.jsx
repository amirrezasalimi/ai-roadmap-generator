import Link from "next/link";
import Image from "next/image";
import ComponentWithStyle from "./styles";
import makeUrl from "@/shared/helper/make-url";
import {LINKS} from "@/shared/constants/links";
import {Text} from "@nextui-org/react";
import Badge from "@/shared/components/badge";
import ReactTimeAgo from "react-time-ago";

const RecentItem = ({roadmap}) => {
    return (
        <ComponentWithStyle>
            <Link target={'_blank'} key={`recent-roadmap-item-${roadmap.code}`}
                  href={makeUrl(LINKS.ROADMAP, {id: roadmap.code})}>
                <div className={"item"}>
                    <div className={"content"}>
                        <Image className={"icon"} alt="link" height={16} width={16} src={'link.svg'}/>
                        <Text className={"text"}>
                            {roadmap.title}
                        </Text>
                    </div>
                    <div className={"details"}>
                        {roadmap?.expand?.category?.title ?
                            <Badge className={"category"} size={"xs"} isSquared color={"primary"} variant={"flat"}>
                                {roadmap?.expand?.category?.title}
                            </Badge>
                            :
                            <div></div>
                        }
                        <div className={"counters"}>
                            <Text className={"text"}>
                                {roadmap?.created && (
                                    <ReactTimeAgo
                                        verboseDate={new Date().toISOString()}
                                        date={new Date(roadmap?.created ?? "")}
                                        locale="en-US"
                                    />
                                )}
                            </Text>
                            <Text className={"text"}>
                                likes {roadmap.likes}
                            </Text>
                        </div>
                    </div>
                </div>
            </Link>
        </ComponentWithStyle>
    )
};
export default RecentItem;
