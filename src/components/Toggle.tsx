import React, { useEffect, useRef, useState } from 'react'
import { Button, Typography } from '@mui/material'
import { IControlState, Control } from '@q-sys/qrwc'

function Toggle({ control, falseLabel, trueLabel }: {control: Control | undefined, falseLabel?: string, trueLabel?: string}) {
  const [toggled, setToggled] = useState(false)
  const [busy, setBusy] = useState(false)
  const lastCoreValue = useRef(false)

  useEffect(() => {
    if (!control) return

    const initial = !!control.state?.Bool
    lastCoreValue.current = initial
    setToggled(initial)

    const listener = (state: IControlState) => {
      const v = !!state.Bool
      lastCoreValue.current = v
      setToggled(v)
      setBusy(false)
    }

    control.on('update', listener)
    return () => control.removeListener('update', listener)
  }, [control])

  if (!control) return null

  const handleClick = async () => {
    if (busy) return
    const next = !toggled
    setToggled(next)
    setBusy(true)

    try {
      await control.update(next)
    } catch (err) {
      setToggled(lastCoreValue.current)
      setBusy(false)
      console.warn('[Toggle] update failed', err)
    }
  }


    return (
        <Button
        sx = {(theme) => ({
                bgcolor: toggled ? theme.palette.primary.main : theme.palette.action.disabledBackground,
                color: toggled ? theme.palette.primary.contrastText : theme.palette.text.secondary,
                transition: theme.transitions.create(['background-color', 'color'],{ duration: theme.transitions.duration.short})
            })}
            variant={toggled ? "contained" : "contained"}
        onClick={() => {
            const newValue = !toggled
            setToggled(newValue)
            control.update(newValue)
        }}
        >
        <Typography variant="body2" >
            {toggled ? trueLabel || "ON" : falseLabel || "OFF"}
        </Typography>
        </Button>
    )
}

export default Toggle