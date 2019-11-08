import React, { useState, useEffect, useReducer } from 'react'
import { Box, Flex, Image } from '../primitives'

import { clone, sample, random } from 'lodash'

// import tickSound from '../assets/sound/tick7.mp3'
// import endSound from '../assets/sound/end4.mp3'
// import startSound from '../assets/sound/start2.mp3'

import { TimelineMax, Circ, Expo, Power4, TweenMax } from 'gsap'
import fake from '../libs/fake'

import Wiring from '../libs/wiring'
function defaults(state={}) {
  return {
    ...state,
    duration: 10,
    offset: random(-55, 55),
    tileSize: 128,
    winningIndex: 100,
  }
}

const SpinnerEngine = ({ children }) => {
  const [width, setWidth] = useState(0)
  const [ref, setRef] = useState(null)

  const timeline = new TimelineLite({ paused: true })

  useEffect(() => {
    if(ref) setWidth(ref.offsetWidth)
  }, [window.onresize, ref])

  // useEffect(() => {
  //   return () => {
  //     timeline.kill()
  //   }
  // }, [])

  useEffect(() => {
    console.log('ref set', ref)
    if(ref) roll()
  }, [ref])

  const roll = bets => {
    const { duration, offset, tileSize, winningIndex } = defaults()

    // position of the center
    const tickPos = width / 2
    // align "selector" with center of tile.
    const centerTile = tickPos - tileSize / 2
    // define the position to end the spin
    const pos = tileSize * winningIndex - centerTile - offset
    // tile count, each time it increments we play a "tick" sound.
    let lastTile = 0

    console.log({
      duration, offset, tileSize, winningIndex,
      tickPos, centerTile, pos, lastTile
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
          // const { winningIndex, spinnerContent, winner } = state
          // const player = clone(players.find(plr => plr.id === winner))
          // player.selected = true
          // spinnerContent.splice(winningIndex, 1, player)
          // setState({ ...state, spinnerContent })
        },
      })
      .paused(false)
  }

  return (
    <Box
      // width={1}
      my={2}
      style={{
        boxShadow: 'inset 0 0 10px #000000',
        borderRadius: 5,
        minHeight: 130,
        overflow: 'hidden',
        position: 'relative',
        background: 'rgba(27, 23, 37, 0.5)',
        border: 'solid rgba(0, 0, 0, 0.2) 1px',
      }}
    >
      <Tick />
      <Flex
        style={{
          position: 'absolute',
        }}
        width={1}
        ref={div => setRef(div)}
      >
        {children}
      </Flex>
    </Box>
  )
}

const generateSpinner = items => {
  if (!items) {
    items = fake.players()
  }
  items = clone(items)
  const size = 500
  let count = 0
  const sampleSet = []

  while (count++ < size) {
    const item = sample(items)
    sampleSet.push(item)
  }

  return sampleSet
}

const Avatar = props => (
  <Image
    {...props}
    width={128}
    height={128}
    style={{
      borderRadius: 5,
      minWidth: 128,
      minHeight: 128,
      // boxShadow: '1px 2px 1px rgba(0, 0, 0, 0.25)',
      // border: '1px solid rgba(0, 0, 0, 0.5)',
      ...(props.selected
        ? {
            border: '1px solid white',
          }
        : null),
    }}
  />
)

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

export default Wiring.connectMemo(p => {
  console.log('test', p)
  const content = generateSpinner()

  return (
    <Box>
      <SpinnerEngine>
        {content.map((user, idx) => {
          return (
            <Avatar
              selected={user.selected}
              key={user.id + idx}
              src={user.image}
            />
          )
        })}
      </SpinnerEngine>
    </Box>
  )
}, p => {
  return {
    jackpot: p.jackpot
  }
})
