import ComponentWithStyle from "./styles";
import { Card, Loading, Text } from "@nextui-org/react";
import FormProvider from "@/shared/components/form/provider";
import TextField from "@/shared/components/form/text-field";
import TextareaField from "@/shared/components/form/textarea";
import Button from "@/shared/components/button";
import useCreateFlow from "@/modules/new-flow/hooks/create-flow";
import { OPEN_AI_TOKEN } from "@/shared/constants/config"
import WaitingProgress from "../progress";
const FormNewRoadMap = () => {
    const hookCreateFlow = useCreateFlow();
    const submitForm = (values) => {
        hookCreateFlow.action({ textOrder: values.textOrder, token: values?.token })
    }
    const showToken = OPEN_AI_TOKEN != null
    return (
        <ComponentWithStyle>
            <Card className="card">
                <Text size={16} color="$secondaryText">
                    Enter Description for your Roadmap , in details
                </Text>
                <FormProvider
                    returnToParent={false}
                    defaultValues={{ token: null, textOrder: '' }}
                    onSubmit={async (values) => {
                        submitForm(values);
                    }}
                >
                    <div className="formContainer">
                        {
                            showToken &&
                            <TextField
                                key="token"
                                type={'token'}
                                label="token"
                                fullWidth
                                clearable
                                bordered
                                name="token"
                            />
                        }
                        <TextareaField
                            rows={6}
                            key="description"
                            type={'text'}
                            label="description"
                            fullWidth
                            clearable
                            bordered
                            name="textOrder"
                        />
                        <div>
                            <Button
                                fullWidth
                                className="submitButton"
                                size={"lg"}
                                disabled={hookCreateFlow.status === 'loading'}
                                type="submit"
                            >
                                {hookCreateFlow.status === 'loading' &&
                                    <Loading type="points" color="currentColor" size="sm" />
                                }
                                {hookCreateFlow.status !== 'loading' &&
                                    <>Generate</>
                                }
                            </Button>
                            {
                                hookCreateFlow.status == "loading" &&
                                <WaitingProgress wait={60 * 1.5} /> // min
                            }
                        </div>
                    </div>
                </FormProvider>
            </Card>
        </ComponentWithStyle>
    )
};
export default FormNewRoadMap;
