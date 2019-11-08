import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import {} from 'styled-system'
import { Badge, Box, Flex, Text } from '../primitives'
import utils from './Utils'
import Assets from './Assets'
import Timer from './Timer'

import Wiring from '../libs/wiring'
import SpinnerEngine from './SpinnerEngine'
import uuid from 'uuid/v4'

const SpinnerBet = styled(Box)`
  flex-shrink: 0;
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

// const Wheel = styled(Flex)`
//   height: 100%;
//   left: 0;
//   position: absolute;
//   width: ${p => (p.isState('cooldown') ? '1000%' : `${)}}
//   transition: transform 6s cubic-bezier(0.13, 0.85, 0.75, 1);
//   will-change: transform;
//   transform: ${p => {
//     return p.isState('cooldown') ? 'translateX(-${500}%)' : 'translateX(0%)'
//   }};
// `

const Spinner = Wiring.connectMemo(
  ({ state = 'open', items = [], value = 5.43, bets = [], outcome = null }) => {
    const isState = desired => {
      return state === desired
    }

    const [counter, setCounter] = useState(0)
    const [percents, setPercents] = useState([])
    const [data, setData] = useState({ spinnerBets: bets })

    const spinnerConfig = outcome => {
      // outcome = outcome * 100
      // calculate all bet percentages
      const spread = bets.map(bet => {
        const p = (bet.value / value) * 100
        setCounter(counter + p)
        return p
      })
      console.log('percents', spread)

      // calculate outcome offset
      const offset = spread.reduce((memo, p) => {
        if (outcome < p && outcome + 0.05 > p) {
          memo = -0.45
        } else if (outcome > p && outcome - 0.05 < p) {
          memo = 0.1
        }
        return memo
      }, 0)

      //add more width
      let spinnerBets = [...bets]
      while (spinnerBets.length < bets.length * 10) {
        spinnerBets = [...spinnerBets, ...bets]
      }

      const width = spinnerBets.reduce((memo, b) => {
        memo += (b.value / value) * 100
        return memo
      }, 0)

      return {
        spread,
        offset,
        outcome, // 0/1
        translateX: outcome * 100 + 550,
        //        translateX: outcome + 50 + offset + 500,
        spinnerBets,
        width,
        // winningIndex:
      }
    }

    useEffect(() => {
      const data = spinnerConfig(outcome)
      setData(data)
    }, [outcome])

    return (
      <Box bg="subnavbg" height={100} border="1px solid #18181a">
        {/* TODO: show only based on state. */}
        {isState('cooldown') && (
          <>
            <TopArrow />
            <BottomArrow />
          </>
        )}
        <SpinnerEngine
          isRolling={isState('cooldown') ? outcome : null}
          config={data}
          // width={1}
          width={!isState('cooldown') ? `${items.length}%` : `100%`}
        >
          {data.spinnerBets.map(({ color = '#8847ff', ...b }, i) => {
            const background = utils.generateBackground(i, color)
            return (
              <SpinnerBet
                style={{
                  transition: 'width linear 1s !important',
                  display: 'inline-block'
                }}
                // width={128}
                width={`${(b.value / value) * 100}%`}
                height={128}
                background={background}
                key={uuid()}
                {...b}
              />
            )
          })}
        </SpinnerEngine>
      </Box>
    )
  },
  p => {
    const provable = p.jackpot.provable
    console.log(p.jackpot)
    return {
      state: p.jackpot.state,
      items: p.jackpot.items,
      value: p.jackpot.value,
      bets: p.jackpot.bets,
      players: p.jackpot.players,
      outcome: provable ? provable.outcome : null,
    }
  }
)

const RoundInfo = Wiring.connectMemo(
  ({ value = 5.43, items = [], config = {}, state = 'open', winner }) => {
    return (
      <Flex position="absolute" width={1} top={-20} zIndex={2}>
        <Badge>
          <Assets.Icons.Coins size={20} bg="yellow" /> <Box mx={1} />
          {utils.parseValue(value)}
        </Badge>
        <Text color="subtext" mx="auto">
          {winner ? winner.username : state}
        </Text>
        <Badge>
          <Assets.Icons.Gun bg="yellow" />({items.length}/
          {config.roundItemLimit || 100})
        </Badge>
      </Flex>
    )
  },
  p => {
    return {
      value: p.jackpot.value,
      items: p.jackpot.items,
      config: p.jackpot.config,
      state: p.jackpot.state,
      // winner: p.jackpot.winner ? p.jackpot.players.find(p => p.id === p.jackpot.winner) : null
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
