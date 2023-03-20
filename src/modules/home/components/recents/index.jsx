import ComponentWithStyle from "./styles";
import {Card, Loading, Row, Text} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import makeUrl from "@/shared/helper/make-url";
import {LINKS} from "@/shared/constants/links";
import {useEffect} from "react";
import useGetRecentRoadmap from "@/modules/home/hooks/get-recent-roadmap";

const RecentRoadMap = () => {
    const hookGetRecentRoadmap = useGetRecentRoadmap();
    useEffect(()=> {
        hookGetRecentRoadmap.action();
    },[]);

    return (
        <ComponentWithStyle>
            <Card className={'card'}>
                <Text size={16} weight={"800"}>
                    Recent Roadmaps
                </Text>
                <div className={"list"}>
                    {
                        hookGetRecentRoadmap.status === "loading" &&
                        <Row justify={"center"}>
                            <Loading color={"secondary"}/>
                        </Row>
                    }
                    {
                        hookGetRecentRoadmap.status === "done" &&
                        hookGetRecentRoadmap?.data?.map((item)=> (
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
