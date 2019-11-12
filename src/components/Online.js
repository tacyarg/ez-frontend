import React, { useState } from 'react'
import Assets from './Assets'
import { Flex } from '../primitives'
import Wiring from '../libs/wiring'

const Online = ({ online = 0 }) => {

  return (
    <Flex alignItems="center" justifyContent="center">
      {online}
      <Assets.Icons.User bg="red" ml={2} size={18} />
    </Flex>
  )
}

export default Wiring.connectMemo(Online, p => {
  console.log(p.public.stats)
  return {
    online: p.public.stats.online,
  }
})
