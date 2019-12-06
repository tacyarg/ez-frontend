import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { } from 'styled-system'
import { Box, Flex } from '../../primitives'
import Wiring from '../../libs/wiring'
import Assets from '../Assets'

const Timer = styled(Flex)`
  z-index: -1;
  width: 50%;
  position: absolute;
  bottom: -5px;
  left: 25%;
  background-color: rgb(20, 20, 21);
`

Timer.displayName = 'Timer'
Timer.defaultProps = {}

const LeftTriangle = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  top: -15px;

  left: -10px;
  border-right: 10px solid rgb(23, 23, 25);
`

const RightTriangle = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  top: -15px;

  right: -10px;
  border-left: 10px solid rgb(23, 23, 25);
`

const Progress = styled(Flex)`
  margin-bottom: 0;
  height: 5px;
  padding: 1px 0 2px 0;
`

const Bar = styled.div`
  transition: width linear 1s !important;
  width: ${p => p.value}%;
  background-color: rgb(68, 175, 71);
`

const TimerBar = ({ isSoundMuted, timeleft = 0, ...p }) => {

  useEffect(() => {
    if (timeleft > 5 || isSoundMuted) return
    Assets.Sounds.tick.play()
  }, [timeleft])

  return (
    <Timer {...p}>
      <LeftTriangle />
      <Progress width={1}>
        <Bar value={timeleft} />
      </Progress>
      <RightTriangle />
    </Timer>
  )
}

TimerBar.CurrentJackpotRound = Wiring.connectMemo(TimerBar, p => {
  function normalize(value, min=1, max=100) {
    var delta = max - min;
    return (value - min) / delta;
  }
  const normalTime = normalize(p.jackpot.timeleft)
  const timeleft = Math.floor(normalTime)

  console.log("time", p.jackpot.timeleft, normalTime, timeleft)

  return {
    isSoundMuted: p.isSoundMuted,
    timeleft,
  }
})

export default TimerBar
