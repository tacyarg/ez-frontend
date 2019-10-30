import React from "react";
import Wiring from "react-wiring";

import fake from "./fake";

//default state you want your component props to see
const defaultState = {
  initialized: false,
  time: Date.now(),
  user: null,
  token: null,
  online: 69,
  chat: {
    id: "en",
    messages: fake.messages()
  },
  inventory: fake.inventory(),
  jackpot: fake.jackpot()
};

//design your state reducers
const reducers = {
  initialize(state, initialized) {
    return {
      ...state,
      initialized
    };
  },
  tick(state, time) {
    // state.time = Date.now()
    // return state
    return {
      ...state,
      time: Date.now()
    };
  },
  sendChatMessage(state, message) {
    console.log("sendChatMessage", state, message);

    message = {
      image:
        "https://steamcdn-a.opskins.media/steamcommunity/public/images/avatars/f2/f20f3036e3182ce5c31b33e512dfdd3251b47d33_full.jpg",
      username: "tacyarg",
      rank: 1,
      message
    };

    return {
      ...state,
      chat: {
        ...state.chat,
        messages: [...state.chat.messages, message]
      }
    };
  },
  updateChannelState(channel, channelState) {
    return {
      ...state,
      [channel]: channelState
    }
  }
};

const wiring = Wiring(React, defaultState, reducers);
// let {Provider,dispatch,connect} = wiring

// tick time
setInterval(function () {
  wiring.dispatch("tick")();
}, 1000);

function isEqual(prev, next) {
  const prevKeys = Object.keys(prev);
  const nextKeys = Object.keys(next);
  if (prevKeys.length !== nextKeys.length) return false;
  // console.log(prev, next)
  return nextKeys.every(key => {
    // console.log(key, prev[key] === next[key])
    return prev[key] === next[key];
  });
}

wiring.connectMemo = (component, map) => {
  return wiring.connect(React.memo(component, isEqual), map);
};

export default wiring;
