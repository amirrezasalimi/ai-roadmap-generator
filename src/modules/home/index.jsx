import Button from "@/shared/components/button";
import { Row, Text, Grid, Spacer } from "@nextui-org/react";
import Image from "next/image";
import ComponentWithStyle from "./styles";
import Logo from "@/shared/components/logo";
import Link from "next/link";
import APP from "@/shared/constants/app";
import FormNewRoadMap from "./components/form-new-roadmap";
import RecentRoadMap from "./components/recents";

const Home = () => {
    const isBrowser = typeof window != "undefined"
    return (
        <ComponentWithStyle>
            <Spacer y={2} />
            <Row justify={'center'}>
                <Logo size={"lg"} />
            </Row>
            <Spacer y={2} />
            <Grid.Container className={'note'}>
                <Grid xs={12} sm={10} md={8} lg={6} xl={5} display="flex" direction="column" justify="center">
                    <div className={"card"}>
                        <Text className={"hint"}>
                            We are using Open Ai GPT and do not refer to its data scientifically. The data is only
                            collected by artificial intelligence.
                        </Text>
                    </div>
                </Grid>
            </Grid.Container>
            <Spacer y={1} />
            <Grid.Container className={'content'}>
                <Grid xs={12} sm={5} md={4} lg={3} xl={2.5} display="flex" justify="center">
                    <div className={'box'}>
                        {isBrowser && <FormNewRoadMap />}
                    </div>
                </Grid>
                <Grid xs={12} sm={5} md={4} lg={3} xl={2.5} display="flex" justify="center">
                    <div className={'box'}>
                        <RecentRoadMap />
                    </div>
                </Grid>
            </Grid.Container>
            <Row className="buttonLinkContainer">
                <Link href={APP.GITHUB_LINK}>
                    <Button size={'lg'}>
                        <Image className={"icon"} alt="github" height={25} width={25} src={'github.svg'} />
                        github
                    </Button>
                </Link>
                <Link href={APP.FIGMA_LINK}>
                    <Button size={'lg'}>
                        <Image className={"icon"} alt="figma" height={25} width={25} src={'figma.svg'} />
                        figma
                    </Button>
                </Link>
            </Row>
            <Spacer y={2} />
            <div className="gradient1" />
            <div className="gradient2" />
        </ComponentWithStyle>
    )
};
export default Home;
