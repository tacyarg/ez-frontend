import React, { useState, useEffect, useReducer } from 'react'
import { Box, Flex, Image } from '../../primitives'
import styled from 'styled-components'
import {} from 'styled-system'
// import tickSound from '../assets/sound/tick7.mp3'
// import endSound from '../assets/sound/end4.mp3'
// import startSound from '../assets/sound/start2.mp3'

import { TimelineMax, Circ, Expo, Power4, TweenMax } from 'gsap'
import fake from '../../libs/fake'

// this file defines the behavior of the spinner states
// it also defines what they will look like, how they animate, ect.

function defaults(state = {}) {
  return {
    duration: 8,
    // outcome: 100,
    ...state,
  }
}

const SpinnerItems = styled(Flex)`
  position: relative;
  left: 0;
  transition: transform 7s cubic-bezier(0.12, 0.5, 0.25, 1);
  will-change: transform;
  backface-visibility: hidden;
  perspective: 1000;
  transform: translateZ(0);
  transform: rotateZ(360deg);
  transform: ${p =>
    p.isRolling ? `translateX(-${p.config.translateX}%)` : null};
`

const SpinnerContainer = styled(Box)`
  transition: transform 7s cubic-bezier(0.12, 0.5, 0.25, 1);
  will-change: transform;
`

const SpinnerEngine = ({ isRolling, config = {}, children, ...p }) => {
  console.log('SPINNER PROPS', isRolling, config, p)
  const [offsetWidth, setWidth] = useState(0)
  const [ref, setRef] = useState(null)

  const timeline = new TimelineLite({ paused: true })

  useEffect(() => {
    setTimeout(() => {
      console.log('roll', config)
      // roll(config)
    }, 1000)
    // return () => {
    //   timeline.kill()
    // }
  }, [isRolling])

  const roll = config => {
    if (!config.outcome) return console.log('outcome is not ready yet.')
    let { duration, offset, width, tileSize, outcome, translateX } = defaults(
      config
    )

    // outcome = outcome * 100

    // position of the center
    const tickPos = offsetWidth / 2
    // align "selector" with center of tile.
    const centerTile = tickPos - tileSize / 2
    // define the position to end the spin
    // let pos = tileSize * outcome - centerTile - offset
    const pos = translateX * 3
    // tile count, each time it increments we play a "tick" sound.
    let lastTile = 0

    console.log('SPINNING', outcome)
    console.log({
      width,
      config,
      duration,
      offset,
      tileSize,
      outcome,
      tickPos,
      centerTile,
      pos,
      lastTile,
      translateX,
    })

    // define the animation timeline.
    timeline
      .to(ref, duration, {
        onUpdateParams: ['{self}'],
        x: -pos,
        ease: Circ.easeOut,
        onStart() {
          // play the starting spin sound.
          // start.play()
          console.log('starting spinner')
        },
        onUpdate(tween) {
          const x = tween.target._gsTransform.x
          const tile = Math.abs(Math.round(x / tileSize))
          if (lastTile < tile) {
            lastTile = tile
            // tick.play()
          }
        },
        roundProps: 'x',
      })
      .to(ref, 0.5, {
        delay: 0.3,
        x: -pos - offset,
        // clearProps: 'transform',
        onStart() {
          // stop.play()
        },
        onComplete: () => {
          // const { outcome, spinnerContent, winner } = state
          // const player = clone(players.find(plr => plr.id === winner))
          // player.selected = true
          // spinnerContent.splice(outcome, 1, player)
          // setState({ ...state, spinnerContent })
        },
      })
      .paused(false)
  }

  return (
    <Box
      width={1}
      height={'100%'}
      position="relative"
      overflow="hidden"
      boxShadow="inset 0 0 4px #000000"
      {...p}
    >
      {/* <Tick /> */}
      <SpinnerItems isRolling={isRolling} config={config}>
        {children}
      </SpinnerItems>
    </Box>
  )
}

const Tick = () => (
  <Box
    style={{
      backgroundColor: 'red',
      borderRadius: 4,
      position: 'absolute',
      left: 0,
      right: 0,
      margin: 'auto',
      width: 2,
      top: 0,
      bottom: 0,
      zIndex: 1,
    }}
  />
)

export default SpinnerEngine
