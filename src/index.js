import React, { useState } from 'react'
import ReactDOM from 'react-dom'

// if (process.env.NODE_ENV !== 'production') {
//   const whyDidYouRender = require('@welldone-software/why-did-you-render')
//   whyDidYouRender(React, {
//     onlyLogs: true,
//     titleColor: 'green',
//     diffNameColor: 'darkturquoise',
//   })
// }

import { BrowserRouter, HashRouter, Switch, Route } from 'react-router-dom'

import App from './App'
import Theme from './Theme'

// wire to the backend.
import { Authenticate } from './libs/utils'
import Wiring from './libs/wiring'
import Socket from './libs/socket'

console.log(process.env.SOCKET_URL, process.env.AUTH_URL)

const START = async p => {
  // connect to socket before we init the app...
  const socket = await Socket(
    process.env.SOCKET_URL,
    async (type, channel, channelState, fullState) => {

      if (type === 'change') {
        console.log('state changed:', channel, channelState)
        Wiring.dispatch('updateChannelState')(channel, channelState)
      }

      if (type === 'close') {
        //server went offline
      }

      if (type === 'reconnect') {
        //socket reconnected after being disconnected
        await Authenticate(socket, window.localStorage.getItem('tokenid'))
          .then(Wiring.dispatch('auth'))
          .catch(err => console.log('authenticate error', err))
      }
    }
  )

  await Authenticate(socket, window.localStorage.getItem('tokenid'))
    .then(Wiring.dispatch('auth'))
    .catch(err => console.log('authenticate error', err))

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
