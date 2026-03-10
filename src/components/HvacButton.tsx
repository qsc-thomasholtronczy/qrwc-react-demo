import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { IControlState, Control } from '@q-sys/qrwc'
import { Code, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'

type IconSpec = React.ElementType | keyof typeof ICON_MAP | string

const ICON_MAP = {
    KeyboardArrowUp,
    KeyboardArrowDown
} as const

function ResolveIcon(icon: IconSpec | undefined): React.ElementType {
    if (!icon) return Code
    if (typeof icon === 'function') return icon
    return (ICON_MAP as any)[icon] ?? Code
}

function HvacButton({control, icon}: {control: Control | undefined, icon?: string}) {

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

    const Icon = ResolveIcon(icon)

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
        <Icon />
        </Button>
    )
}

export default HvacButton