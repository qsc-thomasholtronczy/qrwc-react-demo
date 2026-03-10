import React, { useEffect } from 'react'
import { Button } from '@mui/material'
import { IControlState, Control } from '@q-sys/qrwc'

function Trigger({control, label }: {control: Control | undefined, label?: string }) {

  useEffect(() => {
    if (!control) return
    
    const listener = (state: IControlState) => {
        // no need to set state here since trigger is momentary and will reset to false immediately
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
        variant="contained"
        onClick={() => control?.update(1)}
        sx={{ width: 100, height: 40 }}
    >
        {label || "Trigger"}
    </Button>
    )
}

export default Trigger
