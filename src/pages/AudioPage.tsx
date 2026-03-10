import React from 'react'
import { displayCardSx, SECTION_HEIGHT, SECTION_WIDTH } from '../surfaces'
import { Box, Stack, Typography } from '@mui/material'
import Meter from '../components/Meter'
import Toggle from '../components/Toggle'

export default function PageView({ controls}: any) {
    return (
        <Stack direction="column" spacing={2} justifyContent="center" sx={{ mb: 4 }} alignItems="center">
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                Audio Controls
            </Typography>
            <Stack direction="row" spacing={6} justifyContent="center" alignItems="center" sx={{ mb: 4}}>
                <Box
                sx={(theme) => ({
                    ...displayCardSx(theme),
                    minHeight: 225,
                    maxHeight: SECTION_HEIGHT,
                    minWidth: SECTION_WIDTH,
                    display: 'grid',
                    gridTemplateRows: '1fr auto', // content grows, footer hugs bottom
                })}
                >
                {/* Content area */}
                    <Stack
                        direction="column"
                        spacing={2}
                        alignItems="center"
                        sx={{ p: 2, minHeight: 0 }}  // use padding instead of margin for predictable sizing
                    >
                        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        Microphone Input
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Level
                        </Typography>
                        <Meter control={controls.MicrophoneInput} />
                    </Stack>
                {/* Footer area (always at bottom) */}
                <Box sx={{ p: 2, pt: 0, display: 'flex', justifyContent: 'center' }}>
                    <Toggle control={controls.MicrophoneMute} falseLabel="Unmuted" trueLabel="Muted" />
                </Box>
                </Box>
                <Box
                sx={(theme) => ({
                    ...displayCardSx(theme),
                    minHeight: 225,
                    maxHeight: SECTION_HEIGHT,
                    minWidth: SECTION_WIDTH,
                    display: 'grid',
                    gridTemplateRows: '1fr auto', // content grows, footer hugs bottom
                })}
                >
                    {/* Content area */}
                    <Stack
                        direction="column"
                        spacing={2}
                        alignItems="center"
                        sx={{ p: 2, minHeight: 0 }}  // use padding instead of margin for predictable sizing
                    >
                        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        Loudspeaker Outputs
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Level
                        </Typography>
                        <Meter control={controls.LoudspeakerOut1}/>
                        <Meter control={controls.LoudspeakerOut2}/>
                    </Stack>
                    {/* Footer area (always at bottom) */}
                    <Box sx={{ p: 2, pt: 0, display: 'flex', justifyContent: 'center' }}>
                        <Toggle control={controls.LoudspeakerMute} falseLabel='Unmuted' trueLabel='Muted'/>
                    </Box>
                </Box>
            </Stack>
        </Stack>
    )
}