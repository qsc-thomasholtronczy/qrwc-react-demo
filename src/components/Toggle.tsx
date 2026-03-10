import React, { useEffect, useState } from 'react'
import { Button, Typography } from '@mui/material'
import { IControlState, Control } from '@q-sys/qrwc'

function Toggle({ control, falseLabel, trueLabel }: {control: Control | undefined, falseLabel?: string, trueLabel?: string}) {
  
  const [toggled, setToggled] = useState(false)

  useEffect(() => {
    if (!control) return

    setToggled(control.state?.Bool)
    
    const listener = (state: IControlState) => {
        setToggled(state.Bool)
    }
    control?.on('update', listener)

    return () => {
        control?.removeListener('update', listener)
    }
}, [control])

if (!control) {
    return null
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