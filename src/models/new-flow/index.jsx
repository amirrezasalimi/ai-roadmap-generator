import { Container, Row, Text, Button, Col } from "@nextui-org/react";
import FormProvider from '../../shared/components/form/provider/index';
import TextField from '../../shared/components/form/text-field/index';
import TextareaField from './../../shared/components/form/textarea/index';

const NewFlow = () => {
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
              console.log(values);
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
              css={{ width: '100%', marginTop: 20 }}
              type="submit"
            >
              submit
            </Button>
          </FormProvider>
        </Row>
      </Col>

    </Container>
  )
};
export default NewFlow;
