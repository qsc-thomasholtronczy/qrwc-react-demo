import React, { useEffect, useRef, useState } from 'react'
import { Box, ButtonBase, Dialog, DialogContent, DialogTitle, Stack, Typography } from '@mui/material'
import type { Control, IControlState } from '@q-sys/qrwc'

function useNumericValue(control?: Control, fallback = 3) {
  const [value, setValue] = useState<number>(fallback)
  useEffect(() => {
    if (!control) {
      setValue(fallback)
      return
    }

    // Value can be number/boolean depending on control type — normalize safely
    const v = control.state.Value
    setValue(typeof v === 'number' ? v : v ? 1 : 0)

    const listener = (state: IControlState) => {
      const next = state.Value
      setValue(typeof next === 'number' ? next : next ? 1 : 0)
    }

    control.on('update', listener)
    return () => control.removeListener('update', listener)
  }, [control, fallback])
  return value
}

function useStringValue(control?: Control, fallback = '') {
  const [text, setText] = useState<string>(fallback)

  useEffect(() => {
    if (!control) {
      setText(fallback)
      return
    }

    setText(control.state.String ?? fallback)

    const listener = (state: IControlState) => {
      setText(state.String ?? fallback)
    }

    control.on('update', listener)
    return () => control.removeListener('update', listener)
  }, [control, fallback])
  return text
}

export default function StatusText({ control }: { control: Control | undefined }) {
    const status = useNumericValue(control, 2)
    const textString = useStringValue(control, '')
    const [open, setOpen] = useState(false)
    const closeTimerRef = useRef<number | null>(null)

    

    //Status Mappings from Q-SYS
    const isGreen = status === 0
    const isYellow = status === 1
    const isRed = status === 2

    const handleOpen = () => {
        setOpen(true)
        if (closeTimerRef.current) {
            window.clearTimeout(closeTimerRef.current)
        }

        closeTimerRef.current = window.setTimeout(() => {
            setOpen(false)
            closeTimerRef.current = null
        }, 5000)
    }

    const handleClose = () => {
        setOpen(false)
        if (closeTimerRef.current) {
            window.clearTimeout(closeTimerRef.current)
            closeTimerRef.current = null
        }
    }

    useEffect(() => {
        return () => {
            if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current)
        }
    }, [])

    if (!control) return null

    return (
        <>
        <ButtonBase
            onClick={handleOpen}
            sx={{
                borderRadius: 1,
                px: 1,
                py: 1,
                '&:hover': { backgroundColor: 'action.hover' },
                '&:focus-visible': { outline: '2px solid', outlineColor: 'primary.main' },
            }}
            aria-label="Show Status Information"
            >
            <Stack direction="row" spacing={2} alignItems="center">
                <Box
                sx={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    bgcolor: isGreen ? 'success.main' : 'action.disabledBackground',
                }}
                />
                <Box
                sx={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    bgcolor: isYellow ? 'yellow' : 'action.disabledBackground',
                }}
                />
                <Box
                sx={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    bgcolor: isRed ? 'red' : 'action.disabledBackground',
                }}
                />
            </Stack>
        </ButtonBase>

        <Dialog 
            open={open} 
            onClose={handleClose}
            PaperProps={{
                sx: {
                    minWidth: '50%',
                    minHeight: '20%',
                    maxWidth: '50%'
                }
            }}
            >
            <DialogTitle>Core Status</DialogTitle>
            <DialogContent>
                <Typography variant="body1">{textString || "Status currently unavailable. Please check connection to Core."}</Typography>
            </DialogContent>
        </Dialog>
        </>
    )
}