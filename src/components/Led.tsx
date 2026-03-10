import React, { useEffect, useState } from 'react'
import { Avatar } from '@mui/material'
import { IControlState, Control } from '@q-sys/qrwc'
import { CodeOff, Code } from '@mui/icons-material'

function Led({ control }: {control: Control | undefined }) {

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

    return (
    <Avatar
        sx={{
            // width: 24,
            // height: 24,
            bgcolor: toggled ? 'red' : 'lightgrey',
        }}>
        {toggled ? <Code /> : <CodeOff />}
    </Avatar>
)
}

export default Led