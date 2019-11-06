import React from 'react'
import { Text, Box, Flex } from '../primitives'

import Wiring from '../libs/wiring'
import GameNav from '../components/GameNav'
import Assets from '../components/Assets'
import Utils from '../components/Utils'

const TitleBar = ({ label = 'Settings' }) => {
  return (
    <Box
      p={3}
      bg="backingDark"
      borderBottom="2px solid rgba(0, 0, 0, 0.5)"
      // boxShadow='0px 0px 2px 0px rgba(0, 0, 0, 1)'
    >
      <Text fontSize={4}>{label}</Text>
    </Box>
  )
}

const User = ({ user }) => {
  return (
    <Flex flexDirection="column">
      <Box
        bg="backingLight"
        p={2}
        borderBottom="3px solid #42b142"
        // borderBottom="1px solid #e94c4c"
      >
        <Text fontSize={3}>User</Text>
      </Box>
      <Flex p={2} px={4} mr={4} alignItems="center">
        <Assets.Avatar size={100} src={user.avatar} />
        <Box mx={1} />
        <Text fontSize={5}>{user.username}</Text>
      </Flex>
    </Flex>
  )
}

const Stats = ({ label, value }) => {
  return (
    <Flex flexDirection="column" flex={1}>
      <Box
        bg="backingLight"
        p={2}
        borderBottom="3px solid #42b142"
        // borderBottom="1px solid #e94c4c"
      >
        <Text fontSize={3}>{label}</Text>
      </Box>
      <Text.Heading
        p={2}
        px={4}
        flex={1}
        as={Flex}
        fontSize={8}
        alignItems="center"
      >
        {Utils.parseValue(value)}
      </Text.Heading>
    </Flex>
  )
}

export default Wiring.connectMemo(
  p => {
    return (
      <>
        <GameNav {...p} />
        <TitleBar />
        <Flex>
          <User user={p.user} />
          <Stats label="Deposited" value={4.53} />
          <Stats label="Won" value={4.53} />
          <Stats label="Profit" value={4.53} />
        </Flex>
        <TitleBar label="Game History" />

        <Flex p={2} flexDirection="column">
          history yo
        </Flex>
      </>
    )
  },
  p => {
    // console.log('SETTINGS', p)

    return {
      location: p.location,
      history: p.history,
      user: p.private.me || {},
      socket: p.socket,
    }
  }
)
