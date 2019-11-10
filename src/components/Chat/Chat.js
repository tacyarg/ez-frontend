import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import Assets from '../Assets'
import { Flex, Box, Text, Sidebar } from '../../primitives'

import Wiring from '../../libs/wiring'

import Message from './Message'
import SendMessage from './SendMessage'
import Heading from './Heading'

const Messages = Wiring.connectMemo(
  ({ messages, onChange }) => {
    useEffect(() => {
      onChange(messages)
    })

    return messages.map(m => {
      if (!m.user) return
      return <Message key={m.id} {...m} />
    })
  },
  p => {
    return {
      onChange: p.onChange,
      messages: Object.values(p.public.chats.en),
    }
  }
)

const Chat = ({ showChat = true }) => {
  const [pauseScroll, setPauseScroll] = useState(false)

  let chatElement = null

  const scrollToBottom = () => {
    if (pauseScroll) return

    const scrollHeight = chatElement.scrollHeight
    const height = chatElement.clientHeight
    const maxScrollTop = scrollHeight - height
    ReactDOM.findDOMNode(chatElement).scrollTop =
      maxScrollTop > 0 ? maxScrollTop : 0
  }

  useEffect(() => {
    scrollToBottom()
  })

  return (
    <Sidebar
      p={2}
      width={330}
      bg="backingDark"
      alignItems="center"
      isOpen={showChat}
    >
      <Heading />

      {pauseScroll && (
        <Flex
          position="absolute"
          alignItems="center"
          justifyContent="center"
          p={2}
          // bg="red"
          width={1}
          flexDirection="column"
        >
          <Text color="yellow">Chat Paused</Text>
        </Flex>
      )}
      <Flex
        width={1}
        flex={1}
        my={3}
        pb={2}
        bg="backingLight"
        style={{
          border: '1px solid #1b1b1b',
          overflowY: 'auto',
          overflowX: 'hideen',
          overflowWrap: 'break-word',
        }}
        flexDirection="column"
        onMouseEnter={e => setPauseScroll(true)}
        onMouseLeave={e => {
          setPauseScroll(false)
          scrollToBottom()
        }}
        ref={el => {
          chatElement = el
        }}
      >
        <Messages onChange={scrollToBottom} />
      </Flex>
      <SendMessage />
    </Sidebar>
  )
}

export default Wiring.connectMemo(Chat, ({ showChat }) => {
  return {
    showChat,
  }
})
