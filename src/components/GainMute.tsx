// basic volume GainMute using mui
import React, { useEffect, useState } from 'react'
import { Stack, Button, FormControlLabel } from '@mui/material'
import { IControlState, Control } from '@q-sys/qrwc'

function GainMute({control }: {control: Control | undefined}) {
  const [muted, setMuted] = useState(false)

  useEffect(() => {
    if (!control) return

    setMuted(!!control.state?.Bool)
    
    const listener = (state: IControlState) => {
      setMuted(state.Bool)
    }
    control?.on('update', listener)

    return () => {
      control?.removeListener('update', listener)
    }
  }, [control])

  // check if control exists
  if (!control) {
    return null
  }

  return (
    <FormControlLabel
      control={
        <Stack direction="row" spacing={1} alignItems="center">
          <Button
            variant={muted ? "contained" : "outlined"}
            color={muted ? "primary" : "secondary"}
            onClick={() => {
                const newValue = !muted
                setMuted(newValue)
                control.update(newValue)
            }}
            >
            {muted ? "Muted" : "Unmuted"}
          </Button>
        </Stack>
      }
      label={control?.component.name || control?.name || "Gain"}
      labelPlacement="top"
    />
  )
}

export default GainMute