import React, { useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import type { Control, IControlState } from '@q-sys/qrwc'


export function useAirwallState(control?: Control, fallback = false) {
  const [toggled, setToggled] = useState<boolean>(fallback)

  useEffect(() => {
    if (!control) {
      setToggled(fallback)
      return
    }

    setToggled(!!control.state?.Bool)

    const listener = (state: IControlState) => {
      setToggled(!!state.Bool)
    }

    control.on('update', listener)
    return () => control.removeListener('update', listener)
  }, [control, fallback])

  return toggled
}

export default function AirwallIndicator({ control }: { control?: Control }) {
  const toggled = useAirwallState(control, false)

  if (!control) return null

  return (
      <Typography variant="h6" sx={{ color: 'primary.contrastText' }}>
        {toggled ? 'Combined' : 'Divided'}
      </Typography>
    // </Box>
  )
}