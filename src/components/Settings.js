import React, { useState, useEffect } from 'react'
import { Box } from '../primitives'

export const Volume = ({ globalMute }) => {
  const [muted, setMuted] = useState(false)

  const toggleMute = () => {
    return setMuted(!muted)
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
