import React from "react";
import Wiring from "react-wiring";

import fake from "./fake";

//default state you want your component props to see
const defaultState = {
  initialized: false,
  time: Date.now(),
  user: null,
  token: null,
  chat: {
    id: "en",
    messages: fake.messages()
  },
  inventory: fake.inventory()
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
    
    const newState = { ...state };
    newState.chat.messages = [...state.chat.messages, message];
    return newState;
  }
};

const wiring = Wiring(React, defaultState, reducers);

// let {Provider,dispatch,connect} = wiring

// tick time
setInterval(function() {
  wiring.dispatch("tick")();
}, 1000);

export default wiring;
