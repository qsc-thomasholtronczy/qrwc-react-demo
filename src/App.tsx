import './App.css'
import React from 'react'
import { Box, Container, createTheme, CssBaseline, IconButton, PaletteMode, Stack, ThemeProvider, Typography } from '@mui/material'
import { DarkMode, LightMode, Menu } from '@mui/icons-material'

//Pages
import { navLabelMap, type NavItemId } from './pages/Navigation'
import SidebarNav from './pages/SidebarNav'
import RoomLayoutPage from './pages/RoomLayoutPage'
import LightingPage from './pages/LightingPage'
import AudioPage from './pages/AudioPage'
import DisplaysPage from './pages/DisplaysPage'
import HvacPage from './pages/HvacPage'

//QRWC Components
import { useQrwc } from './context/QrwcContext'
import CoreStatus from './components/CoreStatus'

function App() {
  const { initialized, controls } = useQrwc()
  const [activeView, setActiveView] = React.useState<NavItemId>('room-layout') // Initial Page on load
  const [drawerOpen, setDrawerOpen] = React.useState(false) // Init Menu to closed
  const [mode, setMode] = React.useState<PaletteMode>(() => {
    const stored = localStorage.getItem('theme')
    return stored === 'dark' || stored === 'light' ? stored : 'light'
  })

  
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: '#0166FF' },
          secondary: { main: '#031625' },
          success: { main: '#26DB18' },
          background: {
            default: mode === 'dark' ? '#0F172A' : '#F9FAFB',
            paper: mode === 'dark' ? '#020617' : '#FFFFFF',
          },
        },
        typography: {
          fontFamily: 'Arial, sans-serif',
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: 
            { 
              body: {
                backgroundImage: mode === 'dark' ? `url(/bg-dark.png)` : `url(/bg-light.png)`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundAttachment: 'fixed',

                // keeps your existing palette background colors as a fallback
                backgroundColor: mode === 'dark' ? '#0F172A' : '#F9FAFB',
                minHeight: '100vh',
              },       
              'body::before': {
                content: '""',
                position: 'fixed',
                inset: 0,
                pointerEvents: 'none',
                background: mode === 'dark'
                  ? 'rgba(2, 6, 23, 0.65)'
                  : 'rgba(255, 255, 255, 0.55)',
                zIndex: -1,
              },
            },
          },

          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 12,
                textTransform: 'none',
              },
            },
          },
        },
      }),
    [mode]
  )


  const toggleTheme = () => {
    setMode((prev) => {
      const next = prev === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', next)
      return next
    })
  }

  if (!initialized) {
    return <div>Initializing...</div>
  } 

  const handleOpenDrawer = () => setDrawerOpen(true)
  const handleCloseDrawer = () => setDrawerOpen(false)

  const handleSelectView = ( viewId: NavItemId) => {
    setDrawerOpen(false)
    setActiveView(viewId)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <SidebarNav
          activeView={activeView}
          setActiveView={handleSelectView}
          open={drawerOpen}
          onClose={handleCloseDrawer}
        />
        <Box component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Box component="header" sx={{ px: 1.5, py: 1.5, borderBottom: '1px solid', borderColor: 'divider', display:'flex', alignItems: 'center', gap: 2 }}>

            <Box sx={{ px: 2, py: 1 }}>
              <IconButton
                edge="start"
                onClick={handleOpenDrawer}
                aria-label="open navigation"
              >
                <Menu />
              </IconButton>
            </Box>
            <Box sx={{ flexShrink: 0, textAlign: 'center' }}>
              <Typography color="text.primary" variant='h6'>
                {navLabelMap[activeView]}
              </Typography>
            </Box>
            <Box sx={{
                height: 'auto',
                width: 'auto',
                ml: 'auto',
                flexShrink: 0,
              }}>
              <IconButton onClick={toggleTheme} aria-label="toggle theme">
                {mode === 'dark' ? <LightMode/> : <DarkMode/>}
              </IconButton>
            </Box>
          </Box>

          <Box sx={{ flexGrow: 1, py: 4 }}>
            <Container maxWidth="lg">
              {activeView === 'room-layout' && <RoomLayoutPage controls={controls} />}
              {activeView === 'lighting' && <LightingPage controls={controls} />}
              {activeView === 'audio' && <AudioPage controls={controls} />}
              {activeView === 'displays' && <DisplaysPage controls={controls} />}
              {activeView === 'hvac' && <HvacPage controls={controls} />}
            </Container>
          </Box>

          <Box
            component="footer"
            sx={{
              px: 1.5,
              py: 1.5,
              borderTop: '1px solid',
              borderColor: 'divider',
              display: 'grid',
              gridTemplateColumns: '1fr auto 1fr',
              alignItems: 'center',
              columnGap: 2,
            }}
          >
            {/* Left */}
            <Box sx={{ justifySelf: 'start', minWidth: 0 }}>
              <CoreStatus control={controls.DesignStatus} />
            </Box>

            {/* Center */}
            <Box sx={{ justifySelf: 'center', textAlign: 'center' }}>
              <Stack direction="column">
                <Typography variant="caption" lineHeight={1.5} color="text.secondary">
                  *This demo is for development purposes only and may not represent best practices for production applications.
                </Typography>
                <Typography variant="caption" lineHeight={1.5} color="text.secondary">
                  ©QSC 2026
                </Typography>
              </Stack>
            </Box>

            {/* Right */}
            <Box
              component="img"
              src={mode === 'dark' ? '/Q-SYS_logo@1x.png' : '/Q-SYS_logo_RGB.svg'}
              alt="Company logo"
              sx={{
                justifySelf: 'end',
                height: 36,
                width: 'auto',
                flexShrink: 0,
              }} 
            />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default App