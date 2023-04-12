import ComponentWithStyle from "./styles";
import {Grid, Loading, Row, Spacer, Text} from "@nextui-org/react";
import Logo from "@/shared/components/logo";
import Button from "@/shared/components/button";
import Image from "next/image";
import {useRouter} from "next/router";
import {useEffect} from "react";
import useGetCategoryData from "./hooks/get-categories";
import RoadmapCard from "./components/roadmap-card";

const CategoryItem = () => {
    const router = useRouter();
    const {slug} = router.query;
    const hookGetCategoryData = useGetCategoryData();
    const {category, items} = hookGetCategoryData.data;
    useEffect(() => {
        if (slug)
            hookGetCategoryData.action(slug);
    }, [slug]);
    const backEvent = () => {
        router.back()
    }
    return (
        <ComponentWithStyle md>
            <Spacer y={2}/>
            <Row justify={'center'}>
                <Logo size={"lg"}/>
            </Row>
            <Spacer y={2}/>
            <Row justify={"space-between"}>
                <Button onClick={backEvent} className={"backButton"} color={"default"} bordered>
                    <Image className={"icon"} alt="back" height={25} width={25} src={'/arrow-left.svg'}/>
                </Button>
                {
                    hookGetCategoryData.status === "loading" &&
                    <Row justify={"center"}>
                        <Loading color={"secondary"}/>
                    </Row>
                }
            </Row>
            {
                hookGetCategoryData.status === "done" &&
                <>
                    <div className={"headerCategory"}>
                        <div className={"iconContainer"}>
                            <Image className={"icon"} alt="back" height={60} width={60}
                                   src={`/category-icon/${category.slug}.svg`}/>
                            <div className={"gradient"}/>
                        </div>
                        <div className={"textContainer"}>
                            <Text size={16} className={"text"}>
                                {category.title}
                            </Text>
                            <Text size={16} className={"count"}>
                                12 <span>/Roadmap</span>
                            </Text>
                        </div>
                    </div>
                    <Grid.Container gap={2} justify="center">
                        {items?.map((item, index) => (
                            <Grid key={`category-item-page-${index}`} xs={6} sm={4} md={2.4} lg={2}>
                                <RoadmapCard data={item}/>
                            </Grid>
                        ))}
                    </Grid.Container>
                </>
            }
        </ComponentWithStyle>
    )
};
export default CategoryItem;
