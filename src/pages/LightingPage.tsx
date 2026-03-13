import React from 'react'
import { displayCardSx } from '../surfaces'
import {Box, Stack, Typography } from '@mui/material'
import Fader from '../components/Fader'
import PressNHold from '../components/PressNHold'

export default function PageView({ controls}: any) {
    return (
        <Stack direction="column" spacing={2} justifyContent="center" sx={{ mb: 4 }} alignItems="center">
            <Box sx={(theme) => ({ ...displayCardSx(theme), minHeight: 0, width: '50%' })}>
            <Stack direction="column" spacing={2} justifyContent="center" sx={{ m:4}} alignItems="center">
                <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                    Faders
                </Typography>
                
                <Stack direction="row" spacing={6} justifyContent="center" alignItems="stretch" sx={{ mb: 4 }} >
                    <Fader control={controls['LD-Controls']['percent.1']} label="Perimeter" min={0} max={100} step={20} unit={"%"}/>
                    <Fader control={controls['LD-Controls']['percent.2']} label="Front Wall" min={0} max={100} step={1} unit={"%"}/>
                    <Fader control={controls['LD-Controls']['percent.3']} label="Table" min={0} max={100} step={1} unit={"%"}/>
                    <Fader control={controls['LD-Controls']['percent.4']} label="Master" min={0} max={100} step={10} unit={"%"}/>
                </Stack>
            </Stack>
            </Box> 
            <Box sx={(theme) => ({ ...displayCardSx(theme), width: '50%' })}>
            <Stack direction="column" spacing={2} justifyContent="center" sx={{ m:4}} alignItems="center">
                <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                    Presets
                </Typography>
                <Stack direction="row" spacing={6} justifyContent="center" sx={{ mb: 4 }} alignItems="center">             
                    <PressNHold pressControl={controls['LD-Preset_1']['input']} heldControl={controls['Preset_Save_1']['percent.output']} btnLabel='Preset 1' heldLabel='Saved'/>
                    <PressNHold pressControl={controls['LD-Preset_2']['input']} heldControl={controls['Preset_Save_2']['percent.output']} btnLabel='Preset 2' heldLabel='Saved'/>
                    <PressNHold pressControl={controls['LD-Preset_3']['input']} heldControl={controls['Preset_Save_3']['percent.output']} btnLabel='Preset 3' heldLabel='Saved'/>
                </Stack>
            </Stack>
            </Box> 
        </Stack>
        
    )
}



