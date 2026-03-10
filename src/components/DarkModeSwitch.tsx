import React, { useEffect, useState } from 'react'
import { FormControlLabel, Stack, Switch, Typography } from '@mui/material'
import { IControlState, Control } from '@q-sys/qrwc'

function Toggle({ control}: {control: Control | undefined}) {
  
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

        <FormControlLabel
            control={
                <Stack direction="row" spacing={1} alignItems="center">
                    <Typography>Dark Mode</Typography>
                    <Switch
                        checked={toggled}
                        onChange={(event) => {
                            setToggled(event.target.checked)
                            control?.update(event.target.checked)
                        }}
                    />
                    <Typography>Light Mode</Typography>
                </Stack>
            }
            label = ""
        />
    
    )
}

export default Toggle