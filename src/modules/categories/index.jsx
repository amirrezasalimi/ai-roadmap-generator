import ComponentWithStyle from "./styles";
import { Grid, Loading, Row, Spacer, Text } from "@nextui-org/react";
import Logo from "@/shared/components/logo";
import Button from "@/shared/components/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CategoryCard from "./components/category-card";
import useGetCategories from "@/shared/hooks/get-categories";
import { useEffect } from "react";
import Footer from "@/shared/components/footer";
import Head from "next/head";

const Categories = () => {
    const router = useRouter();
    const backEvent = () => {
        router.back()
    }
    const hookGetCategories = useGetCategories();
    useEffect(() => {
        hookGetCategories.action();
    }, []);

    const categoriesList = hookGetCategories.data?.map(cat => cat.title).join(",");
    return (
        <>
            <Head>
                <title>AI Roadmap : Categories</title>
                <link rel="canonical" href="https://ai-roadmap.com/categories" />
                {
                    hookGetCategories.status == "done" &&
                    <>
                        <meta name="keywords" content={`Ai Roadmaps Categories , ${categoriesList}`} />
                        <meta property="og:url" content={`https://ai-roadmap.com/categories`} />
                    </>
                }
            </Head>
            <ComponentWithStyle md>
                <Spacer y={2} />
                <Row justify={'center'}>
                    <Logo size={"lg"} />
                </Row>
                <Spacer y={2} />
                <Row align={"center"}>
                    <Button onClick={backEvent} className={"backButton"} color={"default"} bordered>
                        <Image className={"icon"} alt="back" height={25} width={25} src={'arrow-left.svg'} />
                    </Button>
                    <Text className={"title"}>
                        Categories
                    </Text>
                </Row>
                <Spacer y={2} />

                <Grid.Container gap={2} justify="center">
                    {
                        hookGetCategories.status === "loading" &&
                        <Row justify={"center"}>
                            <Loading color={"secondary"} />
                        </Row>
                    }
                    {
                        hookGetCategories.status === "done" &&
                        hookGetCategories?.data?.map((item) => (
                            <Grid key={`categories-page-${item.slug}`} xs={6} sm={4} md={2.4} lg={2}>
                                <CategoryCard data={item} />
                            </Grid>
                        ))
                    }

                </Grid.Container>
                <Footer />
            </ComponentWithStyle>

        </>
    )
};
export default Categories;
