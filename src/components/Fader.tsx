import React, { useEffect, useState } from 'react'
import { Stack, Slider, Typography } from '@mui/material'
import { IControlState, Control } from '@q-sys/qrwc'

interface FaderProps {
  control: Control | undefined
  min?: number
  max?: number
  step?: number
  label?: string
  unit?: string
}
   
const pillThumbSx = (theme: any) => ({
  '& .MuiSlider-thumb': {
    width: 36,
    height: 18,
    borderRadius: 999,
    backgroundColor: theme.palette.primary.main,
    border: `0px solid ${theme.palette.background.paper}`,
    boxShadow:
      theme.palette.mode === 'dark'
        ? '0 8px 18px rgba(0,0,0,0.55)'
        : '0 8px 16px rgba(2,6,23,0.18)',

    '&:hover, &.Mui-focusVisible, &.Mui-active': {
      boxShadow:
        theme.palette.mode === 'dark'
          ? '0 10px 22px rgba(0,0,0,0.7)'
          : '0 10px 20px rgba(2,6,23,0.26)',
    },

    // hit area, centered
    '&::after': {
      width: 28,
      height: 28,
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
    },

    '&::before': {
      boxShadow: 'none',
    },
  },

  '& .MuiSlider-track': {
    backgroundColor: theme.palette.primary.main,
    border: 'none',
    width: 6,
  },

  '& .MuiSlider-rail': {
    opacity: 0.28,
    border: `2px solid ${theme.palette.background.paper}`,
    width: 8,
  },

  // Hide the ticks for 100 and 0 to prevent element overrun. 
    '& .MuiSlider-mark[data-index="0"], & .MuiSlider-mark[data-index="10"]': {
    opacity: 0,
    },

})


function Fader({control, min, max, step, label, unit }: FaderProps) {
  const [faderVal, setFaderVal] = useState(0)

  useEffect(() => {
    if (!control) return

    setFaderVal(control.state.Value ?? 0)
    
    const listener = (state: IControlState) => {
      setFaderVal(state.Value ?? 0)
    }
    control.on('update', listener)

    return () => {
      control.removeListener('update', listener)
    }
}, [control])

if (!control) {
    return null
}

    const effMin = min ?? control?.state.ValueMin ?? 0
    const effMax = max ?? control?.state.ValueMax ?? 0

    const range = effMax - effMin

    const percentMarks = Array.from({ length: 11 }, (_, i) => {
        const pct = i * 10
        const value = effMin + (range * pct) / 100
        const showLabel = pct === 0 || pct === 50 || pct === 100
        return {
            value,
            label: showLabel ? Math.round(value).toString() : '',
        }
    })

    return (
    <Stack sx={{ height: 300 }} spacing={2} direction="column" alignItems="center">
        <Slider
            sx={(theme) => pillThumbSx(theme)}
            aria-label={label || control?.component.name + "-" + control?.name || "Fader"}
            orientation="vertical"
            value={faderVal}
            onChange={(_, newValue) => {
                if (typeof newValue !== 'number') return
                setFaderVal(newValue)
                control?.update(newValue)
            }}
            min={min ?? control.state.ValueMin ?? 0}
            max={max ?? control.state.ValueMax ?? 0}
            marks={percentMarks}
            {...(step !== undefined ? { step } : {})}
        />
        <Typography variant="body2" sx={{ color: 'text.secondary', fontVariantNumeric: 'tabular-nums',minWidth: 48, textAlign: 'center'}}>
            {faderVal.toFixed(0)} {unit || ''}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {label || control?.component.name + "-" + control?.name || "Fader"}
        </Typography>
    </Stack>
    )
}

export default Fader