import React, { useState } from 'react'
import { Input, Box, Text } from '../../primitives'
import Wiring from '../../libs/wiring'

const SendMessage = ({ onSubmit, user }) => {
  const [message, setMessage] = useState('')
  const handleKeyPress = event => {
    if (event.key == 'Enter') {
      dispatchMessage()
    }
  }

  const dispatchMessage = () => {
    if (message.length < 1) return
    onSubmit(message)
    setMessage('')
  }

  return (
    <>
      {user ? <Input
        width={1}
        value={message}
        onKeyDown={handleKeyPress}
        onChange={e => setMessage(e.target.value)}
        placeholder="Say something..."
      /> : <Text color="subtext">Please login to use chat...</Text>}
      <Box mb={2} />
    </>
  )
}

export default Wiring.connectMemo(SendMessage, ({ socket, ...p }) => {
  return {
    user: p.private.me,
    onSubmit: message => {
      return socket.private.call('sendChatMessage', { message })
    },
  }
})
