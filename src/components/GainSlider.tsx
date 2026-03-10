
// basic volume GainSlider using mui
import React, { useEffect, useState } from 'react'
import { Stack, Slider } from '@mui/material'
import { IControlState, Control } from '@q-sys/qrwc'

interface GainSliderProps {
  control: Control | undefined
  min?: number
  max?: number
  step?: number
}

function GainSlider({control, min, max, step }: GainSliderProps) {
  const [gainVal, setGainVal] = useState(0)

  useEffect(() => {
    if (!control) return

    setGainVal(control.state.Value ?? 0)

    const listener = (state: IControlState) => {
      setGainVal(state.Value ?? 0)
    }
    control.on('update', listener)

    return () => {
      control.removeListener('update', listener)
    }
  }, [control])

  const marks = [
    {
      value: min ?? control?.state.ValueMin ?? 0,
      label: min ?? control?.state.ValueMin ?? 0
    },
    {
      value: max ?? control?.state.ValueMax ?? 0,
      label: max ?? control?.state.ValueMax ?? 0
    }
  ]

  if (!control) {
    return null
  }

  return (
    <Stack sx={{ height: 300 }} spacing={1} direction="row">
      <Slider
        aria-label="Volume"
        orientation="vertical"
        value={gainVal}
        onChange={(_, newValue) => {
          if (typeof newValue !== 'number') return
          setGainVal(newValue)
          control?.update(newValue)
        }}
        min={min ?? control.state.ValueMin ?? 0}
        max={max ?? control.state.ValueMax ?? 0}
        marks={marks}
        {...(step !== undefined ? { step } : {})}
      />
    </Stack>
  )
}

export default GainSlider
