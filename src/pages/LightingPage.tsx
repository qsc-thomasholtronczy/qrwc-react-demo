import React from 'react'
import { displayCardSx, SECTION_HEIGHT } from '../surfaces'
import {Box, Stack, Typography } from '@mui/material'
import Fader from '../components/Fader'
import Momentary from '../components/Momentary'

export default function PageView({ controls}: any) {
    return (
        <Stack direction="column" spacing={2} justifyContent="center" sx={{ mb: 4 }} alignItems="center">
            <Box sx={(theme) => ({ ...displayCardSx(theme), minHeight:SECTION_HEIGHT, width: '50%' })}>
            <Stack direction="column" spacing={2} justifyContent="center" sx={{ m:4}} alignItems="center">
                <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                    Faders
                </Typography>
                
                <Stack direction="row" spacing={6} justifyContent="center" alignItems="stretch" sx={{ mb: 4 }} >
                    <Fader control={controls['LD-Perimeter']} label="Perimeter" min={0} max={100} step={1} unit={"%"}/>
                    <Fader control={controls['LD-FrontWall']} label="Front Wall" min={0} max={100} step={1} unit={"%"}/>
                    <Fader control={controls['LD-Table']} label="Table" min={0} max={100} step={1} unit={"%"}/>
                    <Fader control={controls['LD-Master']} label="Master" min={0} max={100} step={1} unit={"%"}/>
                </Stack>
            </Stack>
            </Box> 
            <Box sx={(theme) => ({ ...displayCardSx(theme), width: '50%' })}>
            <Stack direction="column" spacing={2} justifyContent="center" sx={{ m:4}} alignItems="center">
                <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                    Presets
                </Typography>
                <Stack direction="row" spacing={6} justifyContent="center" sx={{ mb: 4 }} alignItems="center">             
                    <Momentary control={controls.LightingPreset1} label="Preset 1" />
                    <Momentary control={controls.LightingPreset2} label="Preset 2" />
                    <Momentary control={controls.LightingPreset3} label="Preset 3" />
                </Stack>
            </Stack>
            </Box> 
        </Stack>
        
    )
}



