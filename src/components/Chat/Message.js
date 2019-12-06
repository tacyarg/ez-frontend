import React from 'react'
import {
  Flex,
  Box,
  Text,
  Divider,
  Avatar,
} from '../../primitives'

import Level from '../Level'

const Message = ({ id, user, message }) => {
  return (
    <>
      <Box mx={2} key={id}>
        <Flex alignItems="center" p={1} flexWrap="wrap">
          <Avatar size={30} src={user.avatar} mr={2} />
          <Level rank={user.rank} />
          <Text
            fontWeight="bold"
            letterSpacing="slight"
            mr={2}
            color="offwhite"
          >
            {user.username}:
          </Text>
          <Text wrap="true" fontWeight="normal" color="subtext">
            {message}
          </Text>
        </Flex>
      </Box>
      <Divider my={2} />
    </>
  )
}

export default React.memo(Message)
