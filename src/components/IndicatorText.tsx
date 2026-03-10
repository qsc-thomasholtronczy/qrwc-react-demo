import React, { useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import { IControlState, Control } from '@q-sys/qrwc'

function IndicatorText({control}: {control: Control | undefined}) {
  const [textString, setTextString] = useState('')

    useEffect(() => {
        if (!control) return

        setTextString(control.state.String ?? "")
        
        const listener = (state: IControlState) => {
            // console.log(state.String)
            setTextString(state.String)
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
        <Typography variant="body2" sx={{ color: 'text.primary' }}>
            {textString}
        </Typography>
    )
}

export default IndicatorText