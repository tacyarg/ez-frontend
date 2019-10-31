import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter, HashRouter, Switch, Route } from 'react-router-dom'

import App from './App'
import Theme from './Theme'

// wire to the backend.
import { Authenticate } from './libs/utils'
import Wiring from './libs/wiring'
import Socket from './libs/socket'

const START = async p => {
  // connect to socket before we init the app...
  const socket = await Socket(
    'wss://socket.ezrage.chips.gg',
    (type, channel, channelState, fullState) => {
      if (type === 'change') {
        console.log('state changed:', channel, channelState)
        Wiring.dispatch('updateChannelState')(channel, channelState)
      }

      if (type === 'close') {
        //server went offline
      }

      if (type === 'reconnect') {
        //socket reconnected after being disconnected
      }
    }
  )

  await Authenticate(socket, window.localStorage.getItem('tokenid'))
    .then(async a => {
      if (a.userid) a.user = await socket.private.call('me')
      return Wiring.dispatch('auth')(a)
    })
    .catch(err => console.log('authenticate error', err))

  console.log('socket', socket)

  socket.public
    .call('echo', { test: true })
    .then(console.log)
    .catch(console.error)

  // start the main react app.
  return ReactDOM.render(
    <Theme>
      <HashRouter>
        <Wiring.Provider socket={socket}>
          <App />
        </Wiring.Provider>
      </HashRouter>
    </Theme>,
    document.getElementById('app')
  )
}

START()
