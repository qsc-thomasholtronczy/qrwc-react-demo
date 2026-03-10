import React, { useEffect, useState } from 'react'
import { Button, FormControlLabel } from '@mui/material'
import { Tv, TvOff } from '@mui/icons-material'
import { IControlState, Control } from '@q-sys/qrwc'

function Toggle({ control }: {control: Control | undefined}) {
  
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
        <FormControlLabel
        control={
            <Button
            sx = {(theme) => ({
                height: 75,
                width: 75,
                fontSize: 36,
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
            {toggled ? <Tv fontSize='inherit'/> : <TvOff fontSize='inherit'/>}
            </Button>
        }
        label= ""//{toggled ? "ON" : "OFF"}
        labelPlacement="top"
        />
    )
}

export default Toggle