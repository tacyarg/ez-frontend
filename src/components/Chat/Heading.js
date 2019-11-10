import React from 'react'
import { Flex, Box } from '../../primitives'
import Assets from '../Assets'
import Online from './Online'

export default p => {
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
