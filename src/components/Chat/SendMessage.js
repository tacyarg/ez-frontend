import React, { useState } from 'react'
import { Input, Box } from '../../primitives'
import Wiring from '../../libs/wiring'

const SendMessage = ({ onSubmit }) => {
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
    <Input
      width={1}
      value={message}
      onKeyDown={handleKeyPress}
      onChange={e => setMessage(e.target.value)}
      placeholder="Say something..."
    />
    <Box mb={2} />
    </>
  )
}

export default Wiring.connectMemo(SendMessage, ({ socket }) => {
  return {
    onSubmit: message => {
      return socket.private.call('sendChatMessage', { message })
    },
  }
})
