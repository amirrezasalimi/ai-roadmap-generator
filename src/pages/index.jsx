import React from "react";
import Head from "next/head";
import NewFlow from "@/models/new-flow";

const HomePage = () => {
  return (
    <>
      <Head>
        <title>ai roadmap</title>
      </Head>
      <NewFlow />
    </>
  );
};
export default HomePage;
