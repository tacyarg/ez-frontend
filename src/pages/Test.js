import React, { useState, useEffect } from 'react'
import { Button, Text, Box, Flex } from '../primitives'

import Wiring from '../libs/wiring'
import GameNav from '../components/GameNav'
import Assets from '../components/Assets'
import Utils from '../components/Utils'
import Modals from '../components/Modals'


const Inventory = ({ inventory = {}, socket, ...p }) => {
  // console.log('testvinventory change', inventory.length)
  return Object.values(inventory).map(i => {
    return <Text key={i.id}>{i.id}</Text>
  })
}

export default Wiring.connect(Inventory, p => {
  // console.log(p.private.inventory)
  return {
    inventory: p.private.inventory || {},
  }
})
