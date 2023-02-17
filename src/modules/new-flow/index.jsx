import Button from "@/shared/components/button";
import {Row, Text, Grid, Spacer} from "@nextui-org/react";
import Image from "next/image";
import ComponentWithStyle from "./styles";
import RecentRoadMap from "@/modules/new-flow/components/recents";
import FormNewRoadMap from "@/modules/new-flow/components/form-new-roadmap";

const NewFlow = () => {
    return (
        <ComponentWithStyle>
            <Row justify={'center'}>
                <Text span size={60}>
                    Ai Roadmap
                    <Text
                        weight="bold"
                        css={{
                            textGradient: "$gradientText",
                        }}
                        span
                        size={60}>
                        Generator
                    </Text>
                </Text>
            </Row>
            <Spacer y={2}/>
            <Grid.Container className={'content'}>
                <Grid xs={12} sm={10} md={8} lg={6} xl={5} display="flex" direction="column" justify="center">
                    <div className={"card"}>
                        <Text className={"hint"}>
                            We are using Open Ai GPT and do not refer to its data scientifically. The data is only
                            collected by artificial intelligence.
                        </Text>
                    </div>
                </Grid>
            </Grid.Container>
            <Spacer y={1}/>
            <Grid.Container className={'content'}>
                <Grid xs={12} sm={5} md={4} lg={3} xl={2.5} display="flex" justify="center">
                    <div className={'box'}>
                        <FormNewRoadMap />
                    </div>
                </Grid>
                <Grid xs={12} sm={5} md={4} lg={3} xl={2.5} display="flex" justify="center">
                    <div className={'box'}>
                        <RecentRoadMap />
                    </div>
                </Grid>
            </Grid.Container>
            <Row className="buttonLinkContainer">
                <Button icon={<Image alt="github" height={25} width={25} src={'github.svg'}/>} size={'lg'}>
                    github
                </Button>
                <Button icon={<Image alt="figma" height={25} width={25} src={'figma.svg'}/>} size={'lg'}>
                    figma
                </Button>
            </Row>
            <div className="gradient1"/>
            <div className="gradient2"/>
        </ComponentWithStyle>
    )
};
export default NewFlow;
