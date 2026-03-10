import React, { useEffect, useState } from 'react'
import { LinearProgress, Stack, Typography } from '@mui/material'
import { IControlState, Control } from '@q-sys/qrwc'

function NormalizeMeterData(raw?: number) {
  const safeRaw = raw ?? -100
  const percent = ((safeRaw + 100) / 120 ) * 100
  const clamped = Math.max(0, Math.min(100, percent))
  return { raw: safeRaw, clamped }
}

function Meter({ control }: {control: Control | undefined }) {

  const [meterVal, setMeterValue] = useState(0)
  const [rawVal, setRawVal] = useState(0)
  
  useEffect(() => {
    if (!control) return
    const listener = (state: IControlState) => {
    const { raw, clamped } = NormalizeMeterData(state.Value)
    setMeterValue(clamped)
    setRawVal(raw)
    } 
    control.on('update', listener)

    return () => {
      control.removeListener('update', listener)
    }
}, [control])

    if (!control) {
        return null
    }

    return (
      <Stack direction="row" spacing={2} alignItems="center">
        <LinearProgress 
            variant="determinate" 
            value={meterVal}
            sx={{ height: 14, borderRadius: 2, width: 200, '& .MuiLinearProgress-bar': {transition: 'none'} }} 
        />
        <Typography 
          variant="body2" 
          sx={{ 
            color: 'text.secondary',
            minWidth: 80, // Ensure the label doesn't shift as values change
            fontVariantNumeric: 'tabular-nums', // Use tabular numbers for consistent width
            flexShrink: 0 // Prevent the label from shrinking
            }}>
            {rawVal.toFixed(2)} dB
        </Typography>
      </Stack>
    )
}
        
export default Meter