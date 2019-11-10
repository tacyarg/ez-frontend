import React, { useState, useEffect } from 'react'
import { Box } from '../primitives'
import Assets from './Assets'
import Wiring from '../libs/wiring'

const Volume = ({ globalMute, onChange }) => {
  const [muted, setMuted] = useState(globalMute)

  const toggleMute = () => {
    const state = !muted
    setMuted(state)
    onChange(state)
  }

  // keep in sync with global state
  useEffect(e => setMuted(globalMute), [globalMute])

  return (
    <Box
      onClick={toggleMute}
      style={{
        cursor: 'pointer',
      }}
    >
      {muted ? (
        <Assets.Icons.VolumeMute size={24} mx={2} />
      ) : (
        <Assets.Icons.VolumeUp size={24} mx={2} />
      )}
    </Box>
  )
}

Volume.Connected = Wiring.connectMemo(
  ({ isSoundMuted }) => {
    return <Volume globalMute={isSoundMuted} onChange={Wiring.dispatch('setIsSoundMuted')}/>
  },
  ({ isSoundMuted }) => {
    return {
      isSoundMuted,
    }
  }
)

export default {
  Volume,
}
