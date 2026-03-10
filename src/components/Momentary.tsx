import React, { useEffect, useState } from 'react'
import { Button, Typography } from '@mui/material'
import { IControlState, Control } from '@q-sys/qrwc'

function Momentary({control, label}: {control: Control | undefined, label?: string}) {

  const [moment, setMoment] = useState(false)

  useEffect(() => {
    if (!control) return

    setMoment(control.state?.Bool)
    
    const listener = (state: IControlState) => {
        setMoment(state.Bool)
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
                bgcolor: moment ? theme.palette.primary.main : theme.palette.action.disabledBackground,
                color: moment ? theme.palette.primary.contrastText : theme.palette.text.secondary,

                transition: theme.transitions.create(['background-color', 'color'],{ duration: theme.transitions.duration.short})
            })}
            variant={moment ? "contained" : "contained"}
            onMouseDown={() => control.update(true)}
            onMouseUp={() => control.update(false)}
            onMouseLeave={() => control.update(false)}
            onTouchStart={() => control.update(true)}
            onTouchEnd={() => control.update(false)}
        >
        <Typography variant="body2">
            {moment ? label || control.component.name + "-" + control.name : label || control.component.name + "-" + control.name}
        </Typography>
        </Button>
    )
}

export default Momentary