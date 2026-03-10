import React from 'react'
import { displayCardSx, SECTION_HEIGHT, SECTION_WIDTH } from '../surfaces'
import { Box, Stack, Typography } from '@mui/material'
import PowerButton from '../components/PowerButton'
import VideoRouting from '../components/VideoRouting'

export default function PageView({ controls }: any) {
  return (
    <Stack direction="column" spacing={2} justifyContent="center" alignItems="center" sx={{ mb: 4 }}>
      <Typography variant="h5" sx={{ color: 'text.secondary' }}>
        Displays
      </Typography>

      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 4 }} alignItems="center">
        {/* Left Display */}
        
        <Box sx={(theme) => ({ ...displayCardSx(theme), minWidth: SECTION_WIDTH })} >
          <Stack direction="column" spacing={2} justifyContent="center" sx={{ m: 2 }} alignItems="center">
            <Typography variant="h6" color="text.primary">
              Left Display
            </Typography>

            <PowerButton control={controls.DisplayLeftPower} />

            <VideoRouting
              choiceControl={controls.LeftDisplayName}
              indexControl={controls.LeftDisplayIndex}
              labels={['Graphic 1', 'Graphic 2', 'Logo', 'Laptop', 'Wall Plate', 'BYOD Input']}
              icons={['Panorama', 'Panorama', 'Panorama', 'Computer', 'SettingsInputHdmi', 'Tv']}
            />
          </Stack>
        </Box>

        {/* Right Display */}
        <Box sx={(theme) => ({ ...displayCardSx(theme), minWidth: SECTION_WIDTH  })} >
          <Stack direction="column" spacing={2} justifyContent="center" sx={{ m: 2 }} alignItems="center">
            <Typography variant="h6" color="text.primary">
              Right Display
            </Typography>

            <PowerButton control={controls.DisplayRightPower} />

            <VideoRouting
              choiceControl={controls.RightDisplayName}
              indexControl={controls.RightDisplayIndex}
              labels={['Graphic 1', 'Graphic 2', 'Logo', 'Laptop', 'Wall Plate', 'BYOD Input']}
              icons={['Panorama', 'Panorama', 'Panorama', 'Computer', 'SettingsInputHdmi', 'Tv']}
            />
          </Stack>
        </Box>
      </Stack>
    </Stack>
  )
}