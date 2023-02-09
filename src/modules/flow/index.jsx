import { useRouter } from "next/router";
import useGetFlow from './hooks/get-flow';
import { useEffect } from 'react';
import { Container, Loading, Row, Text } from "@nextui-org/react";
import DrawFlow from "./components/draw-flow";

const Flow = () => {
  const flow = useGetFlow();
  const { query } = useRouter();
  const flowId = query.id;
  useEffect(() => {
    if(flowId){
      flow.action(flowId)
    }
  }, [flowId]);

  return (
    <>
      {
        flow.status === 'loading' &&
        <Container css={{ height: "100vh" }} justify="center" alignContent="center" display="flex">
            <Row justify={'center'} align={"center"}>
                <Text ht="bold" size={20}
                  css={{
                    textGradient: "45deg, $yellow600 -20%, $red600 100%",
                  }}>
                  wait for drawing
                </Text>
                <Loading type="points" color="currentColor" size="sm" />
            </Row>
        </Container>
      }
      {
        flow.status === 'done' && 
        <DrawFlow data={flow.data} />
      }
    </>
  )
};
export default Flow;
