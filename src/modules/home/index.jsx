import {Row, Grid, Spacer, Container} from "@nextui-org/react";
import ComponentWithStyle from "./styles";
import Logo from "@/shared/components/logo";
import FormNewRoadmap from "./components/form-new-roadmap";
import RecentRoadmap from "./components/recents";
import Categories from "@/modules/home/components/categories";
import Footer from "@/shared/components/footer";

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
                    <Grid xs={12} sm={10} md={10} lg={8} xl={6} display="flex" direction="column" justify="center">
                        <Categories/>
                    </Grid>
                </Grid.Container>
                <Spacer y={1}/>
                <Grid.Container className={'content'}>
                    <Grid xs={12} sm={5} md={5} lg={4} xl={3} display="flex" justify="center">
                        <div className={'box'}>
                            {isBrowser && <FormNewRoadmap/>}
                        </div>
                    </Grid>
                    <Grid xs={12} sm={5} md={5} lg={4} xl={3} display="flex" justify="center">
                        <div className={'box'}>
                            <RecentRoadmap/>
                        </div>
                    </Grid>
                </Grid.Container>
                <Footer/>
      {/*          <div className="gradient1" />
                <div className="gradient2" />*/}
            </Container>
        </ComponentWithStyle>
    )
};
export default Home;
