import React from 'react'
import { displayCardSx } from '../surfaces'
import {Box, Stack, Typography } from '@mui/material'
import { useAirwallState } from '../components/AirwallState'
import Trigger from '../components/Trigger'

export default function PageView({ controls }: any) {
    const airwallState = useAirwallState(controls['RL-FlipFlop']?.['state'])
    return (
        <Stack direction="column" spacing={4} justifyContent="center" sx={{ mb:4 }} alignItems="center">
            {/* <Typography variant='h5' sx={{ color: 'text.primary'}}>
                Room Layout
            </Typography>
             */}
            <Box
                sx={(theme) => ({
                    ...displayCardSx(theme),
                    width: 332,
                    height: 250,
                    borderRadius: 1,
                    overflow: 'hidden',
                    position: 'relative',
                })}>
                {/* Combined */}
                <Box
                    sx={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'url("/combined.png")',
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    opacity: airwallState ? 1 : 0,
                    transition: 'opacity 200ms ease',
                    }}
                />

                {/* Divided */}
                <Box
                    sx={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'url("/divided.png")',
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    opacity: airwallState ? 0 : 1,
                    transition: 'opacity 200ms ease',
                    }}
                />

                {/* Overlay tint */}
                <Box
                    sx={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    opacity: 0.4,
                    background: airwallState
                        ? (theme) => theme.palette.success.main
                        : (theme) =>
                            `linear-gradient(to right,
                            ${theme.palette.error.main} 0 50%,
                            ${theme.palette.success.main} 50% 100%)`,
                    }}
                />
            </Box>
            <Box sx={(theme) => ({ ...displayCardSx(theme), width: '40%' })}>
            <Stack direction="column" spacing={2} justifyContent="center" sx={{ m:4}} alignItems="center">
                <Typography variant='h6' sx={{ color: 'text.primary'}}>
                    Airwall Controls
                </Typography>
                <Stack direction="row" spacing={2} alignItems='center' sx={{mb:4}}>
                    <Trigger control={controls['RL-FlipFlop']?.['set']} label="Combine"/>
                    <Trigger control={controls['RL-FlipFlop']?.['reset']} label="Separate"/>
                </Stack>
            </Stack>
            </Box> 
        </Stack>
    )
}