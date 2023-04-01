import {useEffect} from "react";
import ComponentWithStyle from "./styles";
import RecentItem from "./components/recent-item";
import {Card, Loading, Row, Text} from "@nextui-org/react";
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
                            <RecentItem roadmap={item} />
                        ))
                    }

                </div>
            </Card>
        </ComponentWithStyle>
    )
};
export default RecentRoadMap;
