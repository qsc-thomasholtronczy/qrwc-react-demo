import React from 'react'
import { displayCardSx, SECTION_HEIGHT } from '../surfaces'
import {Box, Stack, Typography } from '@mui/material'
import IndicatorText from '../components/IndicatorText'
import Momentary from '../components/Momentary'
import HvacButton from '../components/HvacButton'
import HvacState from '../components/HvacLed'

export default function PageView({ controls}: any) {
    return (
        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 4 }} alignItems="center">
        <Box sx={(theme) => ({ ...displayCardSx(theme), minHeight:SECTION_HEIGHT, width: '40%' })}>
        <Stack direction="column" spacing={2} justifyContent="center" sx={{ m:4 }} alignItems="center">
            <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                AC Controls
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 4 }} alignItems="center">
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Current Temp
                </Typography>
                <IndicatorText control={controls.ACCurrentTemp} /> 
            </Stack>
            <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 4 }} alignItems="center">
                <Stack direction="column" spacing={2} justifyContent="center" sx={{ mb: 4 }} alignItems="center">
                <HvacButton control={controls.ACUp} icon="KeyboardArrowUp"/>
                <IndicatorText control={controls.ACSetPoint} />
                <HvacButton control={controls.ACDown} icon="KeyboardArrowDown"/>
                </Stack>
                <Stack direction="column" spacing={2} justifyContent="center" sx={{ mb: 4 }} alignItems="center">
                <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 4 }} alignItems="center">
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Heat On
                    </Typography>
                    <HvacState control={controls.HeatOn} color='red' icon='LocalFireDepartment' />
                </Stack>
                <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 4 }} alignItems="center">
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Cool On
                    </Typography>
                    <HvacState control={controls.ACOn} color='#0166FF' icon='AcUnit' />
                </Stack>
                </Stack>
            </Stack>
        </Stack>
        </Box>
        <Box sx={(theme) => ({ ...displayCardSx(theme), minHeight:SECTION_HEIGHT, width: '40%' })}>
            <Stack direction="column" spacing={2} justifyContent="center" sx={{ m:4, height: '100%', display: 'grid', gridTemplateRows: 'auto 1fr 1fr 1fr', gap: 1.5, alignItems: 'stretch'}} alignItems="center">
                <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                    Shades Controls
                </Typography>
                <Momentary control={controls.ShadesUp} label="Open Shades"/>
                <Momentary control={controls.ShadesCustom} label="Custom Shades"/>
                <Momentary control={controls.ShadesDown} label="Close Shades"/>
            </Stack>
        </Box>
        </Stack>
    )
}