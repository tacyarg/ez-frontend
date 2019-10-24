import React, { useEffect, useState } from "react";

import Assets from "../components/Assets";
import {
  Button,
  Flex,
  Box,
  Text,
  Image,
  Sidebar,
  Page,
  Divider,
  Navbar
} from "../primitives";

const Link = ({ onClick, children }) => {
  return (
    <Text.Link
    onClick={onClick}
      my={3}
      as={Flex}
      style={{
        pointer: "cursor",
        ":hover": {
          backgroundColor: "rgba(0,0,0, 0.1)"
        }
      }}
    >
      {children}
    </Text.Link>
  );
};

export default ({ onClick }) => {
  const links = [
    Assets.Icons.Question,
    Assets.Icons.Ban,
    Assets.Icons.History,
    Assets.Icons.Headset
  ];

  return (
    <Sidebar p={3} width={50} bg="backingDark" alignItems="center">
      {links.map((Row, k) => (
        <Link key={k} onClick={onClick}>
          <Row size={22} />
        </Link>
      ))}
    </Sidebar>
  );
};
