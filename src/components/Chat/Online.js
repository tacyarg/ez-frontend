import React, { useState } from 'react'
import Assets from '../Assets'
import { Flex } from '../../primitives'
import Wiring from '../../libs/wiring'

const Online = ({ online = 100 }) => {
  const [count, setCount] = useState(online)

  return (
    <Flex alignItems="center" justifyContent="center">
      {count}
      <Assets.Icons.User bg="red" ml={2} size={18} />
    </Flex>
  )
}

export default Wiring.connectMemo(Online, p => {
  return {
    online: p.online,
  }
})
