import React, { useState } from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, HashRouter, Switch, Route } from "react-router-dom";

import Actions from "./libs/actions";
import App from "./App";
import Theme from "./Theme";

import Utils from "./components/Utils";
import {Authenticate} from './libs/utils'

import Wiring from "./libs/wiring";
// import Client from "./libs/client"

import Socket from './libs/socket'



const START = async p => {

  // connect to socket before we init the app...
  const socket = await Socket('wss://socket.ezrage.chips.gg', (type, channel, channelState, fullState) => {
    if(type==='change'){
      console.log("state changed:", channel, channelState)
      Wiring.dispatch('updateChannelState')(channel, channelState)
    }

    if(type==='close'){
      //server went offline
    }

    if(type === 'reconnect'){
      //socket reconnected after being disconnected
    }
  })

  await Authenticate(actions,window.localStorage.getItem('tokenid'))
    .then(dispatch('auth'))
    .catch(err=>console.log(err))

  console.log('socket', socket)

  socket.public.call('echo', {test: true}).then(console.log).catch(console.error)

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
