import React, { useEffect, useRef, useState } from 'react'
import { Button, FormControlLabel } from '@mui/material'
import { Tv, TvOff } from '@mui/icons-material'
import type { IControlState, Control } from '@q-sys/qrwc'

function PowerButton({ control }: { control?: Control }) {
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
      console.warn('[PowerButton] update failed', err)
    }
  }

  return (
    <FormControlLabel
      control={
        <Button
          disabled={busy}
          sx={(theme) => ({
            height: 75,
            width: 75,
            fontSize: 36,
            bgcolor: toggled ? theme.palette.primary.main : theme.palette.action.disabledBackground,
            color: toggled ? theme.palette.primary.contrastText : theme.palette.text.secondary,
            transition: theme.transitions.create(['background-color', 'color'], {
              duration: theme.transitions.duration.short,
            }),
            opacity: busy ? 0.7 : 1,
          })}
          variant="contained"
          onClick={handleClick}
        >
          {toggled ? <Tv fontSize="inherit" /> : <TvOff fontSize="inherit" />}
        </Button>
      }
      label=""
      labelPlacement="top"
    />
  )
}

export default PowerButton