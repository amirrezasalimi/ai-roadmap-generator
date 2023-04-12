import Link from "next/link";
import Image from "next/image";
import ComponentWithStyle from "./styles";
import makeUrl from "@/shared/helper/make-url";
import { LINKS } from "@/shared/constants/links";
import  { Text } from "@nextui-org/react";

const RoadmapCard = ( { data }) => {
    return (
        <ComponentWithStyle>
            <Link target={'_blank'} key={`recent-roadmap-item-${data.code}`} href={makeUrl(LINKS.ROADMAP, {id: data.code})}>
                <div className={"item"}>
                    <div className={"content"}>
                        <Image className={"icon"} alt="link" height={16} width={16} src={'link.svg'}/>
                        <Text className={"text"}>
                            {data.title}
                        </Text>
                    </div>
                    <div className={"details"}>
                        <div className={"counters"}>
                            <Text className={"text"}>
                                1 days ago
                            </Text>
                            <Text className={"text"}>
                                54 likes
                            </Text>
                        </div>
                    </div>
                </div>
            </Link>
        </ComponentWithStyle>
    )
};
export default RoadmapCard;
