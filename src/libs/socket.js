import Client from 'ws-api-client'

// const initState = {
//   //some initial state
// }

// function handleStateChange(channel, channelState, fullState) {
//   //do something with the new state
//   dispatch('updateChannelState')(channel, channelState)
// }

// Client(window.WebSocket, config, {}, handleStateChange)

// connect to the socket and set the api.
export default (host, onChange, initState = {}) => {

  const config = {
    host: "wss://socket.ezrage.chips.gg",
    channels: [
      'public',
      'private',
      'auth',
    ],
  }

  return Client(window.WebSocket, config, initState, onChange)
}