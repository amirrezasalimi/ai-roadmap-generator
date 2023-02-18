import { useRouter } from "next/router";
import useGetFlow from './hooks/get-flow';
import { useEffect } from 'react';
import { Container, Loading, Row, Text } from "@nextui-org/react";
import DrawFlow from "./components/draw-flow";
import Header from "./components/header";

const Flow = () => {
  const hookFlow = useGetFlow();
  const { query } = useRouter();
  const flowId = query.id;
  useEffect(() => {
    if(flowId){
      hookFlow.action(flowId)
    }
  }, [flowId]);
  const title = hookFlow?.data?.[0]?.title;
  return (
    <>
      {
          hookFlow.status === 'loading' &&
        <Container css={{ height: "100vh" }} justify="center" alignContent="center" display="flex">
            <Row justify={'center'} align={"center"}>
                <Text ht="bold" size={20}
                  css={{
                    textGradient: "$gradientText",
                    marginRight: 12
                  }}>
                  wait for drawing
                </Text>
                <Loading color="secondary" size="sm" />
            </Row>
        </Container>
      }
      {
        hookFlow.status === 'done' &&
          <>
            <Header title={title} />
            <DrawFlow data={hookFlow.data} />
          </>
      }
    </>
  )
};
export default Flow;
