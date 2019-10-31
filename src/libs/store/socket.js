import Client from 'ws-api-client'

// connect to the socket and set the api.
export default (host= 'wss://socket.ezrage.chips.gg', onChange, initState = {}) => {
  const config = {
    host,
    channels: ['public', 'private', 'auth'],
  }

  return Client(window.WebSocket, config, initState, onChange)
}
