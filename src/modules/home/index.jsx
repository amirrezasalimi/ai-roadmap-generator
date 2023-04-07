import Button from "@/shared/components/button";
import {Row, Text, Grid, Spacer, Container} from "@nextui-org/react";
import Image from "next/image";
import ComponentWithStyle from "./styles";
import Logo from "@/shared/components/logo";
import Link from "next/link";
import APP from "@/shared/constants/app";
import FormNewRoadmap from "./components/form-new-roadmap";
import RecentRoadmap from "./components/recents";
import Categories from "@/modules/home/components/categories";
import Footer from "@/shared/components/fotter";

const Home = () => {
    const isBrowser = typeof window != "undefined"
    return (
        <ComponentWithStyle>
            <Spacer y={2}/>
            <Row justify={'center'}>
                <Logo size={"lg"}/>
            </Row>
            <Spacer y={2}/>
            <Container>
                <Grid.Container className={'categories'}>
                    <Grid xs={12} sm={10} md={8} lg={6} xl={5} display="flex" direction="column" justify="center">
                        <Categories/>
                    </Grid>
                </Grid.Container>
                <Spacer y={1}/>
                <Grid.Container className={'content'}>
                    <Grid xs={12} sm={5} md={4} lg={3} xl={2.5} display="flex" justify="center">
                        <div className={'box'}>
                            {isBrowser && <FormNewRoadmap/>}
                        </div>
                    </Grid>
                    <Grid xs={12} sm={5} md={4} lg={3} xl={2.5} display="flex" justify="center">
                        <div className={'box'}>
                            <RecentRoadmap/>
                        </div>
                    </Grid>
                </Grid.Container>
                <Footer/>
                {/*<div className="gradient1" />*/}
                {/*<div className="gradient2" />*/}
            </Container>
        </ComponentWithStyle>
    )
};
export default Home;
