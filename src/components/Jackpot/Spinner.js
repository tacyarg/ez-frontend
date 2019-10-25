import React from "react";
import styled from "styled-components";
import {} from "styled-system";
import { Badge, Box, Flex } from "../../primitives";

import Timer from "./Timer";

function getDark(hex) {
  let thing = [
    ("0x" + hex[1] + hex[2]) | 0,
    ("0x" + hex[3] + hex[4]) | 0,
    ("0x" + hex[5] + hex[6]) | 0
  ];
  thing[0] -= 27;
  thing[1] -= 10;
  thing[2] -= 10;
  return `${thing[0]}, ${thing[1]}, ${thing[2]}`;
}

const SpinnerBet = styled(Box)`
  will-change: transform;
  border-right: 1px solid rgb(69, 69, 71);
  display: inline-block;
  z-index: 1;
  // min-width: 40px;
`;

const TopArrow = styled(Box)`
  display: inline-block;
  width: 0;
  height: 0;
  position: absolute;
  left: 50%;

  margin-left: -13px;
  -ms-transform: rotate(-90deg);
  -webkit-transform: rotate(-90deg);
  transform: rotate(-90deg);

  border-bottom: 26px solid transparent;
  border-top: 26px solid transparent;

  z-index: 2;
  top: -13px;
  border-right: 26px solid rgba(27, 27, 28, 1);
`;

const BottomArrow = styled(Box)`
  display: inline-block;
  width: 0;
  height: 0;
  position: absolute;
  left: 50%;

  margin-left: -13px;
  -ms-transform: rotate(-90deg);
  -webkit-transform: rotate(-90deg);
  transform: rotate(-90deg);

  border-bottom: 26px solid transparent;
  border-top: 26px solid transparent;

  z-index: 2;
  bottom: -13px;
  border-left: 26px solid rgba(27, 27, 28, 1);
`;

const Spinner = ({
  value = 119.71,
  bets = [
    {
      items: [],
      value: 32.42,
      id: "0",
      color: "#e94c4c",
      userid: "01010101"
    },
    {
      items: [],
      value: 32.42,
      id: "1",
      color: "#00aeef",
      userid: "01010101"
    },
    {
      items: [],
      value: 54.87,
      id: "1",
      color: "#ffd200",
      userid: "01010101"
    }
  ]
}) => {
  return (
    <Flex bg="backingLight" height={100} border="1px solid #18181a">
      {/* TODO: show only based on state. */}
      <TopArrow />
      <BottomArrow />

      <Flex overflow="hidden" width={1}>
        {/* TODO: write logic to create "spin" effect. */}
        <Flex
          width={`${bets.length}0%`}
          // width={`${items.length}%`}
        >
          {bets.map(({ color = "#8847ff", ...b }, i) => {
            let background = `repeating-linear-gradient(
              ${i % 2 ? `-50deg` : `50deg`},
              ${color} 1px,
              rgba(${getDark(color)},1) 2px,
              rgba(${getDark(color)},1) 11px,
              ${color} 12px,
              ${color} 20px
            )`;

            return (
              <SpinnerBet
                width={`${(b.value / value) * 100}%`}
                background={background}
                key={b.id}
                {...b}
              />
            );
          })}
        </Flex>
      </Flex>
    </Flex>
  );
};

const RoundInfo = p => {
  return (
    <Flex position="absolute" width={1} top={-20} zIndex={2}>
      <Badge>$5.43</Badge>
      <Box mx="auto" />
      <Badge>(19/100)</Badge>
    </Flex>
  );
};

export default p => {
  return (
    // jackpotOverallBoxContain
    <Box position="relative" my={4} zIndex={1}>
      <RoundInfo />
      <Spinner />
      <Timer />
    </Box>
  );
};
