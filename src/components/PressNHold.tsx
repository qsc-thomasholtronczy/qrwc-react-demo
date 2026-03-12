import React, { useEffect, useRef, useState } from 'react'
import { Button, Typography } from '@mui/material'
import type { IControlState, Control } from '@q-sys/qrwc'

interface PressNHoldProps {
  pressControl?: Control
  heldControl?: Control
  btnLabel?: string
  heldLabel?: string
}

function useHeldState(control?: Control, fallback = false) {
  const [isHeld, setHeld] = useState<boolean>(fallback)

  useEffect(() => {
    if (!control) {
      setHeld(fallback)
      return
    }

    setHeld(!!control.state?.Bool)

    const listener = (state: IControlState) => setHeld(!!state.Bool)
    control.on('update', listener)
    return () => control.removeListener('update', listener)
  }, [control, fallback])

  return isHeld
}

export default function PressNHold({
  pressControl,
  heldControl,
  btnLabel,
  heldLabel,
}: PressNHoldProps) {
  const isHeld = useHeldState(heldControl, false)

  // prevent repeated send spam + help with pointer-cancel edge cases
  const downRef = useRef(false)

  if (!pressControl) return null

  const setPress = async (value: boolean) => {
    try {
      await pressControl.update(value)
    } catch (err) {
      console.warn('[PressState] update failed', err)
    }
  }

  const handleDown = () => {
    if (downRef.current) return
    downRef.current = true
    void setPress(true)
  }

  const handleUp = () => {
    if (!downRef.current) return
    downRef.current = false
    void setPress(false)
  }

  return (
    <Button
      sx={(theme) => ({
        bgcolor: isHeld ? theme.palette.primary.main : theme.palette.action.disabledBackground,
        color: isHeld ? theme.palette.primary.contrastText : theme.palette.text.secondary,
        transition: theme.transitions.create(['background-color', 'color'], {
          duration: theme.transitions.duration.short,
        }),
      })}
      variant="contained"
      onPointerDown={handleDown}
      onPointerUp={handleUp}
      onPointerCancel={handleUp}
      onPointerLeave={handleUp}
    >
      <Typography variant="body1">
        {isHeld
          ? (heldLabel ?? 'Held')
          : (btnLabel ?? `${pressControl.component.name}-${pressControl.name}`)}
      </Typography>
    </Button>
  )
}