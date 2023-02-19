import ComponentWithStyle from "./styles";
import {Card, Loading, Row, Text} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import makeUrl from "@/shared/helper/make-url";
import {LINKS} from "@/shared/constants/links";
import useGetRecentRoadMap from "@/modules/new-flow/hooks/get-recent-roadmap";
import {useEffect} from "react";

const RecentRoadMap = () => {
    const hookGetRecentRoadMap = useGetRecentRoadMap();
    useEffect(()=> {
        hookGetRecentRoadMap.action();
    },[]);

    return (
        <ComponentWithStyle>
            <Card className={'card'}>
                <Text size={16} weight={"800"}>
                    Recent RoadMap List
                </Text>
                <div className={"list"}>
                    {
                        hookGetRecentRoadMap.status === "loading" &&
                        <Row justify={"center"}>
                            <Loading color={"secondary"}/>
                        </Row>
                    }
                    {
                        hookGetRecentRoadMap.status === "done" &&
                        hookGetRecentRoadMap?.data?.map((item)=> (
                            <Link target={'_blank'} key={`recent-roadmap-item-${item.code}`} href={makeUrl(LINKS.ROADMAP, {id: item.code})}>
                                <div className={"item"}>
                                    <Image className={"icon"} alt="github" height={25} width={25} src={'link.svg'}/>
                                    <Text className={"text"}>
                                        {item.title}
                                    </Text>
                                </div>
                            </Link>
                        ))
                    }

                </div>
            </Card>
        </ComponentWithStyle>
    )
};
export default RecentRoadMap;
