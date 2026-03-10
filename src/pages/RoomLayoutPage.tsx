import React from 'react'
import { displayCardSx, SECTION_HEIGHT, SECTION_WIDTH } from '../surfaces'
import {Box, Stack, Typography } from '@mui/material'
import { useAirwallState } from '../components/AirwallState'
import Trigger from '../components/Trigger'

export default function PageView({ controls }: any) {
    const airwallState = useAirwallState(controls.AirwallState)
    return (
        <Stack direction="column" spacing={4} justifyContent="center" sx={{ mb:4 }} alignItems="center">
            <Typography variant='h5' sx={{ color: 'text.primary'}}>
                Room Layout
            </Typography>
            
            <Box
                sx={(theme) => ({
                    ...displayCardSx(theme),
                    width: 332,
                    height: 250,
                    borderRadius: 1,
                    overflow: 'hidden',
                    position: 'relative',

                    backgroundImage: airwallState
                    ? 'url("/combined.png")'
                    : 'url("/divided.png")',
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',

                    '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    background: airwallState
                        ? theme.palette.success.main
                        : `linear-gradient(to right,
                            ${theme.palette.error.main} 0 50%,
                            ${theme.palette.success.main} 50% 100%)`,
                    opacity: 0.4,
                    pointerEvents: 'none',
                    },
                })}
            />
            <Box sx={(theme) => ({ ...displayCardSx(theme), width: '40%' })}>
            <Stack direction="column" spacing={2} justifyContent="center" sx={{ m:4}} alignItems="center">
                <Typography variant='h6' sx={{ color: 'text.primary'}}>
                    Airwall Controls
                </Typography>
                <Stack direction="row" spacing={2} alignItems='center' sx={{mb:4}}>
                    <Trigger control={controls.OpenAirwall} label="Combine"/>
                    <Trigger control={controls.CloseAirwall} label="Separate"/>
                </Stack>
            </Stack>
            </Box> 
        </Stack>
    )
}