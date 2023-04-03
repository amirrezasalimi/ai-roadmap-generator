import Link from "next/link";
import Image from "next/image";
import ComponentWithStyle from "./styles";
import makeUrl from "@/shared/helper/make-url";
import { LINKS } from "@/shared/constants/links";
import  { Text } from "@nextui-org/react";
import Badge from "@/shared/components/badge";

const RecentItem = ( { roadmap }) => {
    return (
        <ComponentWithStyle>
            <Link target={'_blank'} key={`recent-roadmap-item-${roadmap.code}`} href={makeUrl(LINKS.ROADMAP, {id: roadmap.code})}>
                <div className={"item"}>
                    <div className={"content"}>
                        <Image className={"icon"} alt="link" height={16} width={16} src={'link.svg'}/>
                        <Text className={"text"}>
                            {roadmap.title}
                        </Text>
                    </div>
                    <div className={"details"}>
                        <Badge className={"category"} size={"xs"} isSquared color={"primary"} variant={"flat"}>
                            Software development
                        </Badge>
                        <div className={"counters"}>
                            <Text className={"text"}>
                                1 days ago
                            </Text>
                            <Text className={"text"}>
                                54 likes
                            </Text>
                            <Text className={"text"}>
                                235 views
                            </Text>
                        </div>
                    </div>
                </div>
            </Link>
        </ComponentWithStyle>
    )
};
export default RecentItem;
