import FormProvider from "@/shared/components/form/provider";
import TextField from "@/shared/components/form/text-field";
import TextareaField from "@/shared/components/form/textarea";
import { Container, Row, Text, Button, Col, Loading } from "@nextui-org/react";
import useCreateFlow from "./hooks/create-flow";


const NewFlow = () => {
  const createFlow = useCreateFlow();
  const submitForm = (values) => {
    createFlow.action({ textOrder: values.textOrder, tocken: values.tocken })
  }

  return (
    <Container css={{ height: "100vh" }} justify="center" alignContent="center"  display="flex">
      <Col>
        <Row justify={'center'}>
          <Text
            h1
            size={60} 
            css={{
              textGradient: "45deg, $yellow600 -20%, $red600 100%",
            }}
            weight="bold"
          >
            Ai Roadmap Generator
          </Text>
        </Row>
        <Row justify={'center'}>
          <FormProvider
            returnToParent={false}
            defaultValues={{ tocken: '', textOrder: '' }}
            onSubmit={async (values) => {
              submitForm(values);
            }}
          >
            <TextField
              type={'tocken'}
              label="tocken"
              fullWidth
              name="tocken"
            />
            <TextareaField
              type={'textOrder'}
              label="textOrder"
              fullWidth
              name="textOrder"
            />
            <Button
              disabled={createFlow.status === 'loading'}
              css={{ width: '100%', marginTop: 20 }}
              type="submit"
            >
              {createFlow.status === 'loading' &&
                 <Loading type="points" color="currentColor" size="sm" />
              }
              {createFlow.status !== 'loading' &&
                  <>submit</>
              }
            </Button>
          </FormProvider>
        </Row>
      </Col>

    </Container>
  )
};
export default NewFlow;
