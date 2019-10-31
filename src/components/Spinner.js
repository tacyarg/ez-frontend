import React from 'react'
import styled from 'styled-components'
import {} from 'styled-system'
import { Badge, Box, Flex, Text } from '../primitives'
import utils from './Utils'
import Assets from './Assets'
import Timer from './Timer'

import Wiring from '../libs/wiring'

const SpinnerBet = styled(Box)`
  will-change: transform;
  border-right: 1px solid rgb(69, 69, 71);
  display: inline-block;
  z-index: 1;
  // min-width: 40px;
`

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
`

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
`

const Spinner = Wiring.connectMemo(
  ({
    state = 'open',
    items = [],
    value = 5.43,
    bets = [
      // {
      //   items: [],
      //   value: 32.42,
      //   id: "0",
      //   color: "#e94c4c",
      //   userid: "01010101"
      // },
      // {
      //   items: [],
      //   value: 32.42,
      //   id: "1",
      //   color: "#00aeef",
      //   userid: "01010101"
      // },
      // {
      //   items: [],
      //   value: 54.87,
      //   id: "1",
      //   color: "#ffd200",
      //   userid: "01010101"
      // }
    ],
  }) => {
    return (
      <Flex bg="subnavbg" height={100} border="1px solid #18181a">
        {/* TODO: show only based on state. */}
        {state == 'rolling' && (
          <>
            <TopArrow />
            <BottomArrow />
          </>
        )}

        <Flex overflow="hidden" width={1}>
          {/* TODO: write logic to create "spin" effect. */}
          <Flex
            // width={`${bets.length}0%`}
            width={`${items.length}%`} // of 100 (max items is 100)
          >
            {bets.map(({ color = '#8847ff', ...b }, i) => {
              const background = utils.generateBackground(i, color)
              return (
                <SpinnerBet
                  width={`${(b.value / value) * 100}%`}
                  background={background}
                  key={b.id}
                  {...b}
                />
              )
            })}
          </Flex>
        </Flex>
      </Flex>
    )
  },
  p => {
    return {
      state: p.jackpot.state,
      items: p.jackpot.items,
      value: p.jackpot.value,
      bets: p.jackpot.bets,
    }
  }
)

const RoundInfo = Wiring.connectMemo(
  ({ value = 5.43, items = [], config = {} }) => {
    return (
      <Flex position="absolute" width={1} top={-20} zIndex={2}>
        <Badge>
          <Assets.Icons.Coins size={20} bg="yellow" /> <Box mx={1} />
          {utils.parseValue(value)}
        </Badge>
        <Box mx="auto" />
        <Badge>
          <Assets.Icons.Gun bg="yellow" />({items.length}/
          {config.roundItemLimit})
        </Badge>
      </Flex>
    )
  },
  p => {
    return {
      value: p.jackpot.value,
      items: p.jackpot.items,
      config: p.jackpot.config,
    }
  }
)

export default p => {
  return (
    // jackpotOverallBoxContain
    <Box position="relative" my={4} zIndex={1}>
      <RoundInfo />
      <Spinner />
      <Timer />
    </Box>
  )
}
