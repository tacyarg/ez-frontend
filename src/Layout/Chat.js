import React, { useState, useEffect, useMemo } from 'react'
import ReactDOM from 'react-dom'

import Assets from '../components/Assets'
import {
  Button,
  Flex,
  Box,
  Text,
  Image,
  Sidebar,
  Page,
  Divider,
  Navbar,
  Avatar,
  Input,
} from '../primitives'

import Level from '../components/Level'
import Wiring from '../libs/wiring'

const Online = Wiring.connectMemo(
  ({ online = 100 }) => {
    const [count, setCount] = useState(online)

    return (
      <Flex alignItems="center" justifyContent="center">
        {count}
        <Assets.Icons.User bg="red" ml={2} size={18} />
      </Flex>
    )
  },
  p => {
    return {
      online: p.online,
    }
  }
)

const Clock = Wiring.connectMemo(
  ({ time = Date.now() }) => {
    return (
      <Text fontSize={1} color="text">
        {time}
      </Text>
    )
  },
  p => {
    return {
      time: p.time,
    }
  }
)

const Heading = p => {
  return (
    <Flex width={1} p={2}>
      <Assets.Social.Twitter bg="red" size={18} />
      <Box mx={1} />
      <Assets.Social.Discord bg="red" size={18} />
      <Box mx="auto" />
      <Online />
    </Flex>
  )
}

const SendChatMessage = ({ onSubmit }) => {
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
    <Input
      width={1}
      value={message}
      onKeyDown={handleKeyPress}
      onChange={e => setMessage(e.target.value)}
      placeholder="Say something..."
    />
  )
}

const Message = React.memo(m => {
  // console.log(m)
  return (
    <>
          <Divider my={1} />

      <Box mx={2} key={m.id}>
        <Flex alignItems="center" p={1} flexWrap="wrap">
          <Avatar size={30} src={m.image} mr={2} />
          <Level rank={m.rank} />
          <Text
            fontWeight="bold"
            letterSpacing="slight"
            mr={2}
            color="offwhite"
          >
            {m.username || m.user.username}:
          </Text>
          <Text wrap="true" fontWeight="normal" color="subtext">
            {m.message}
          </Text>
          {/* <Box mx={1}>|</Box> */}
        </Flex>
      </Box>
    </>
  )
})

const Chat = ({ messages, socket, ...p }) => {
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
    <Sidebar p={2} width={330} bg="backingDark" alignItems="center">
      <Heading />
      {/* <Clock /> */}

      <Flex
        width={1}
        flex={1}
        my={3}
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
        {messages.map(m => {
          return <Message key={m.id} {...m} />
        })}
      </Flex>
      <SendChatMessage
        onSubmit={message => {
          return socket.private.call('sendChatMessage', { message })
        }}
      />
    </Sidebar>
  )
}

export default Wiring.connectMemo(Chat, p => {
  return {
    socket: p.socket,
    messages: Object.values(p.public.chats.en),
  }
})
