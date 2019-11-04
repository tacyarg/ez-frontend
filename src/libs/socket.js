import Client from 'ws-api-client'

// connect to the socket and set the api.
export default (
  // host = 'wss://socket.ezrage.chips.gg',
  // host="ws://localhost:2002"
  host,
  onChange,
  initState = { private: {}, public: {}, auth: {}, admin: {}, system: {} }
) => {
  const config = {
    host,
    channels: ['admin', 'system', 'private', 'auth', 'public'],
  }

  return Client(window.WebSocket, config, initState, onChange)
}
