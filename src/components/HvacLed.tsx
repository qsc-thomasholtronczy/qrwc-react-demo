import React, { useEffect, useState } from 'react'
import { Avatar } from '@mui/material'
import { IControlState, Control } from '@q-sys/qrwc'
import { LocalFireDepartment, AcUnit, Code } from '@mui/icons-material'


type IconSpec = React.ElementType | keyof typeof ICON_MAP | string

const ICON_MAP = {
    AcUnit,
    Code,
    LocalFireDepartment
} as const

function ResolveIcon(icon: IconSpec | undefined): React.ElementType {
    if (!icon) return Code
    if (typeof icon === 'function') return icon
    return (ICON_MAP as any)[icon] ?? Code
}

function HvacState({ control, color, icon }: {control: Control | undefined, color?: string, icon?: string }) {

  const [toggled, setToggled] = useState(false)

  useEffect(() => {
    if (!control) return 

    setToggled(!!control.state?.Bool)

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

    const Icon = ResolveIcon(icon)

    return ( 
    <Avatar
        sx={(theme) => ({
            // width: 24,
            // height: 24,
            bgcolor: toggled ? color?? theme.palette.primary.main : theme.palette.action.disabledBackground,

            color: toggled ? theme.palette.primary.contrastText : theme.palette.text.secondary,

            transition: theme.transitions.create(['background-color', 'color'],{ duration: theme.transitions.duration.short})
        })}>
        <Icon fontSize = "small" />
    </Avatar>
)
}

export default HvacState