import ComponentWithStyle from "./styles";
import { Grid, Loading, Row, Spacer, Text } from "@nextui-org/react";
import Logo from "@/shared/components/logo";
import Button from "@/shared/components/button";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useGetCategoryData from "./hooks/get-categories";
import RoadmapCard from "./components/roadmap-card";
import Footer from "@/shared/components/footer";
import Head from "next/head";
import useInfiniteScroll from "react-infinite-scroll-hook";

const   CategoryItem = () => {
    const router = useRouter();
    const { slug } = router.query;
    const hookGetCategoryData = useGetCategoryData();
    const { category, items } = hookGetCategoryData.data;

    useEffect(() => {
        if (slug)
            hookGetCategoryData.action(slug);
    }, [slug]);
    const backEvent = () => {
        router.back()
    }

    const [sentryRef] = useInfiniteScroll({
        loading: hookGetCategoryData.status == "loading",
        onLoadMore: () => {
            hookGetCategoryData.page.current++;
            hookGetCategoryData.action(slug)
        },
        hasNextPage: !hookGetCategoryData.isLastPage,
        rootMargin: '0px 0px 400px 0px',
    });
    return (
        <>
            <Head>
                {
                    hookGetCategoryData.status == "done" &&
                    <>
                        <title>AI Roadmap : {category.title} Category</title>
                        <meta name="keywords" content={`Ai Roadmaps for ${category.title} , ${category.title}`} />
                        <link rel="canonical" href={`https://ai-roadmap.com/categories/${category.slug}`} />
                        <meta property="og:url" content={`https://ai-roadmap.com/categories/${category.slug}`} />
                    </>
                }
            </Head>
            <ComponentWithStyle md>
                <Spacer y={2} />
                <Row justify={'center'}>
                    <Logo size={"lg"} />
                </Row>
                <Spacer y={2} />

                <Row justify={"space-between"} align={"center"}>
                    <Button onClick={backEvent} className={"backButton"} color={"default"} bordered>
                        <Image className={"icon"} alt="back" height={25} width={25} src={'/arrow-left.svg'} />
                    </Button>
                    {
                        hookGetCategoryData.status === "done" &&
                        <div className={"headerCategory"}>
                            <div className={"iconContainer"}>
                                <Image className={"icon"} alt="back" height={60} width={60}
                                    src={`/category-icon/${category.slug}.svg`} />
                                <div className={"gradient"} />
                            </div>
                            <div className={"textContainer"}>
                                <Text size={16} className={"text"}>
                                    {category.title}
                                </Text>
                                <Text size={16} className={"count"}>
                                    {category.roadmap_count} <span>/Roadmap</span>
                                </Text>
                            </div>
                        </div>
                    }
                    <div>
                        
                    </div>
                </Row>
                {
                    <Grid.Container gap={2} justify="center">
                        {items?.map((item, index) => (
                            <Grid key={`category-item-page-${index}`} xs={12} sm={4}>
                                <RoadmapCard data={item} />
                            </Grid>
                        ))}
                    </Grid.Container>
                }
                {
                    (hookGetCategoryData.status === "loading" || !hookGetCategoryData.isLastPage) &&
                    <div ref={sentryRef}>
                        <Row justify={"center"}>
                            <Loading color={"secondary"} />
                        </Row>
                    </div>
                }
                <Footer />
            </ComponentWithStyle>

        </>
    )
};
export default CategoryItem;
