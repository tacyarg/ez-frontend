import React, { useEffect, useState } from "react";
import { Text, Flex } from "../../primitives";
import { Utils } from "../index";


const RoundLimits = ({ value, config }) => {
  return <Flex
    alignItems="center"
    flexDirection="column"
    m={[2, 0]}
    width={[1, 1 / 5]}
  >
    <Text fontSize={4} color={"red"}>
      {Utils.parseValue(value)}
    </Text>
    <Text fontSize={1}>
      {`${Utils.parseValue(
        value * config.discrepancyMin
      )} - ${Utils.parseValue(value * config.discrepancyMax)}`}
    </Text>
  </Flex>
}

export default RoundLimits