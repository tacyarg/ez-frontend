import React from 'react'
import Wiring from 'react-wiring'

import fake from './fake'
import utils from './utils'

//default state you want your component props to see
const defaultState = {
  env: {
    AUTH_URL: process.env.AUTH_URL,
    SOCKET_URL: process.env.SOCKET_URL
  },
  initialized: false,
  time: Date.now(),
  user: null,
  userid: null,
  tokenid: null,
  online: 69,
  inventory: fake.inventory(),
  jackpot: fake.jackpot(),
  public: {
    jackpots: {
      'fake': fake.jackpot(),
    },
    coinflips: {
      ...fake.coinflips()
    },
    chats: {
      en: fake.messages()
    }
  },
  private: {
    inventory: {},
    waxInventory: []
  },
  admin: {},
  auth: {},
}

//design your state reducers
const reducers = {
  initialize(state, initialized) {
    return {
      ...state,
      initialized,
    }
  },
  tick(state, time) {
    return {
      ...state,
      time: Date.now(),
    }
  },
  sendChatMessage(state, message) {
    // console.log("sendChatMessage", state, message);

    message = {
      image:
        'https://steamcdn-a.opskins.media/steamcommunity/public/images/avatars/f2/f20f3036e3182ce5c31b33e512dfdd3251b47d33_full.jpg',
      username: 'tacyarg',
      rank: 1,
      message,
    }

    return {
      ...state,
      chat: {
        ...state.chat,
        messages: [...state.chat.messages, message],
      },
    }
  },
  updateChannelState(state, channel, channelState) {
    const newState = {
      ...state,
      [channel]: {
        ...state[channel],
        ...channelState
      },
    }
    // newState.jackpot = utils.findCurrentRound(newState.public.jackpots)
    return newState
  },
  auth(state, auth) {
    console.log('auth', auth)
    return {
      ...state,
      ...auth,
    }
  },
}

const wiring = Wiring(React, defaultState, reducers)
// let {Provider,dispatch,connect} = wiring

// tick time
setInterval(function() {
  wiring.dispatch('tick')()
}, 1000)

function isEqual(prev, next) {
  const prevKeys = Object.keys(prev)
  const nextKeys = Object.keys(next)
  if (prevKeys.length !== nextKeys.length) return false
  // console.log(prev, next)
  return nextKeys.every(key => {
    // console.log(key, prev[key] === next[key])
    return prev[key] === next[key]
  })
}

wiring.connectMemo = (component, map) => {
  return wiring.connect(React.memo(component, isEqual), map)
}

export default wiring
