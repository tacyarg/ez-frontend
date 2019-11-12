import React, { useEffect, useState } from "react";
import {
  Box,Flex,Text
} from "../../primitives";
import Badge from '../Badges'

const Stat = ({ label = "Label", value = 0, money, color }) => {
  return (
    <Flex
      // flexDirection={['column', 'row']}
      // flexWrap="wrap"
      borderRadius="normal"
      width={[1, "auto"]}
      // flex={[1,0]}
      mx={[1, 2]}
      p={[1, 2]}
      alignItems="center"
      style={{
        border: "1px solid #58585c"
      }}
      bg="#434349"
    >
      <Text letterSpacing="slight" px={2}>
        {label.toUpperCase()}
      </Text>
      <Box mx={["auto", 3]} my={[1, 0]} />
      <Badge value={value} color={color} money={money} />
    </Flex>
  );
};

export default Stat