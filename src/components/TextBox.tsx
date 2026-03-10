import React, { useEffect, useState } from 'react'
import { TextField } from '@mui/material'
import { IControlState, Control } from '@q-sys/qrwc'

function TextBox({control }: {control: Control | undefined}) {
  const [textString, setTextString] = useState('')

  useEffect(() => {
    if (!control) return

    setTextString(control.state.String ?? "")
    
    const listener = (state: IControlState) => {
      setTextString(state.String)
    }
    control?.on('update', listener)

    return () => {
      control?.removeListener('update', listener)
    }
  }, [control])

  // check if control exists
  if (!control) {
    return null
  }

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setTextString(event.target.value)
    control?.update(event.target.value)
  }

  return (
    <TextField
      id="outlined-required"
      label="Text Box Control"
      value={textString}
      onChange={handleChange}
    />
  )
}

export default TextBox