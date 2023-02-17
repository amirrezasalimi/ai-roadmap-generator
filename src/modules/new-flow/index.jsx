import Button from "@/shared/components/button";
import FormProvider from "@/shared/components/form/provider";
import TextField from "@/shared/components/form/text-field";
import TextareaField from "@/shared/components/form/textarea";
import {Row, Text, Loading, Card, Grid, Spacer} from "@nextui-org/react";
import Image from "next/image";
import useCreateFlow from "./hooks/create-flow";
import ComponentWithStyle from "./styles";
import styles from "./styles";

const NewFlow = () => {
    const createFlow = useCreateFlow();
    const submitForm = (values) => {
        createFlow.action({textOrder: values.textOrder, token: values.token})
    }

    return (
        <ComponentWithStyle>
            {/*<Row justify={'center'} className={'footer'}>*/}
            {/*  <Text size={16} color="$secondaryText">*/}
            {/*    This is a free service and has no other use.*/}
            {/*  </Text>*/}
            {/*</Row>*/}
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
            <Grid.Container className={'content'}>
                <Grid xs={12} sm={10} md={8} lg={6} xl={4} display="flex" direction="column" justify="center">
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
                <Grid xs={12} sm={5} md={4} lg={3} xl={2} display="flex" justify="center">
                    <div className={'box'}>
                        <Row justify={'center'}>
                            <Card className="card">
                                <Text size={16} color="$secondaryText">
                                    Enter The Relevant Token And Your Content To Draw Automatically.
                                </Text>
                                <FormProvider
                                    returnToParent={false}
                                    defaultValues={{token: '', textOrder: ''}}
                                    onSubmit={async (values) => {
                                        submitForm(values);
                                    }}
                                >
                                    <div className="formContainer">
                                        <TextField
                                            type={'token'}
                                            label="token"
                                            fullWidth
                                            clearable
                                            bordered
                                            name="token"
                                        />
                                        <TextareaField
                                            rows={6}
                                            type={'textOrder'}
                                            label="textOrder"
                                            fullWidth
                                            clearable
                                            bordered
                                            name="textOrder"
                                        />
                                        <Button
                                            className="submitButton"
                                            size={"lg"}
                                            disabled={createFlow.status === 'loading'}
                                            type="submit"
                                        >
                                            {createFlow.status === 'loading' &&
                                                <Loading type="points" color="currentColor" size="sm"/>
                                            }
                                            {createFlow.status !== 'loading' &&
                                                <>submit</>
                                            }
                                        </Button>
                                    </div>
                                </FormProvider>
                            </Card>
                        </Row>
                    </div>
                </Grid>
                <Grid xs={12} sm={5} md={4} lg={3} xl={2} display="flex" justify="center">
                    <div className={'box'}>
                        <Row justify={'center'}>
                            <Card className="card">
                                <Text size={16} color="$secondaryText">
                                    Enter The Relevant Token And Your Content To Draw Automatically.
                                </Text>
                                <FormProvider
                                    returnToParent={false}
                                    defaultValues={{token: '', textOrder: ''}}
                                    onSubmit={async (values) => {
                                        submitForm(values);
                                    }}
                                >
                                    <div className="formContainer">
                                        <TextField
                                            type={'token'}
                                            label="token"
                                            fullWidth
                                            clearable
                                            bordered
                                            name="token"
                                        />
                                        <TextareaField
                                            rows={6}
                                            type={'textOrder'}
                                            label="textOrder"
                                            fullWidth
                                            clearable
                                            bordered
                                            name="textOrder"
                                        />
                                        <Button
                                            className="submitButton"
                                            size={"lg"}
                                            disabled={createFlow.status === 'loading'}
                                            type="submit"
                                        >
                                            {createFlow.status === 'loading' &&
                                                <Loading type="points" color="currentColor" size="sm"/>
                                            }
                                            {createFlow.status !== 'loading' &&
                                                <>submit</>
                                            }
                                        </Button>
                                    </div>
                                </FormProvider>
                            </Card>
                        </Row>
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
