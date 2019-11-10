import React, { useState, useEffect } from 'react'
import { Box } from '../../primitives'
import styled from 'styled-components'
import utils from '../Utils'

import SpinnerEngine from './Engine'
import uuid from 'uuid/v4'
import Assets from '../Assets'

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

const Wheel = ({
  isRolling,
  value = 0,
  bets = [],
  config,
  items = [],
  outcome,
  state,
}) => {
  useEffect(() => {
    Assets.Sounds.newBet.play()
  }, [bets.length])

  useEffect(() => {
    Assets.Sounds.roll.play()
  }, [isRolling])


  return (
    <Box bg="subnavbg" width={1} height={100} border="1px solid #18181a">
      {isRolling && (
        <>
          <TopArrow />
          <BottomArrow />
        </>
      )}
      <SpinnerEngine
        isRolling={isRolling ? outcome : null}
        width={!isRolling ? `${items.length}%` : `100%`}
        config={config}
      >
        {bets.map(({ color = '#8847ff', ...b }, i) => {
          return (
            <SpinnerBet
              style={{
                transition: 'width linear 1s !important',
                display: 'inline-block',
              }}
              width={`${(b.value / value) * 100}%`}
              height={100}
              background={utils.generateBackground(i, color)}
              key={uuid()}
              {...b}
            />
          )
        })}
      </SpinnerEngine>
    </Box>
  )
}

export default Wheel
