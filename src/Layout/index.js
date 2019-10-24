import React, { useEffect, useState } from "react";

import Header from "./Header";
// import Footer from './components/Footer'
import Sidenav from "./Sidenav";
import Chat from "./Chat";

import { Box, Flex, Page } from "../primitives";
import Pages from "../pages";

const Layout = ({ children }) => {
  // const links = Object.keys(Pages).reduce((memo, k) => {
  //   if (k === "NotFound") return memo;
  //   memo.push({ label: k, href: `/${k.toLowerCase()}` });
  //   return memo;
  // }, []);

  return (
    <>
      <Header />

      <Flex
        width={1}
        height={"100%"}
        // bg="backing"
        // justifyContent="center"
        // alignItems="center"
      >
        <Sidenav />
        <Chat />
        <Page>{children}</Page>
      </Flex>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
