import React from "react";
import Head from "next/head";
import NewFlow from "@/modules/new-flow";


const FlowPage = () => {
  return (
    <>
      <Head>
        <title>Ai Roadmap Generator</title>
      </Head>
      <NewFlow />
    </>
  );
};
export default FlowPage; 
