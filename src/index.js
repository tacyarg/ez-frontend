import React, { useState } from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, HashRouter, Switch, Route } from "react-router-dom";

import Actions from "./libs/actions";
import App from "./App";
import Theme from "./Theme";

import Utils from "./components/Utils";

import Wiring from "./libs/wiring";
// import Client from "./libs/client"

import Socket from './libs/socket'



const START = async p => {

  // connect to socket before we init the app...
  const socket = await Socket('wss://socket.ezrage.chips.gg', (channel, channelState, fullState) => {
    console.log("state changed:", channel, channelState)
    Wiring.dispatch('updateChannelState')(channel, channelState)
  })

  // socket.public('echo').then(console.log)

  // start the main react app.
  return ReactDOM.render(
    <Theme>
      <HashRouter>
        <Wiring.Provider socket={socket}>
          <App />
        </Wiring.Provider>
      </HashRouter>
    </Theme>,
    document.getElementById("app")
  );
};

START();
