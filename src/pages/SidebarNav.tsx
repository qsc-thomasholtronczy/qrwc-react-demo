import { Box, Drawer, IconButton, List, ListItemButton, ListItemText, Toolbar, Typography } from '@mui/material'
import { navItems, type NavItemId } from './Navigation'
import { MenuOpen } from '@mui/icons-material'

const drawerWidth = 260

export default function SidebarNav({
  activeView,
  setActiveView,
  open,
  onClose
}: {
  activeView: NavItemId
  setActiveView: (v: NavItemId) => void
  open: boolean
  onClose: () => void
}) {
  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true,
        BackdropProps: {
          invisible: true,
        },
      }}
      sx={{
        '& .MuiDrawer-paper': (theme) => ({
          backgroundColor: 'transparent',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderRight: `1px solid ${theme.palette.divider}`,
        }),
      }}
    >
      <Toolbar>
        <Typography variant="h6">QRWC React Demo</Typography>
      </Toolbar>

      
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <List disablePadding>
          {navItems.map((item) => (
            <ListItemButton
              key={item.id}
              selected={activeView === item.id}
              sx={{
                borderTop: 1,
                borderBottom: 1,
                borderColor: 'divider',
                '&:not(:first-of-type)': { borderTop: 0 },
                '&.Mui-selected': {
                  backgroundColor: 'action.selected',
                  '&:hover': { backgroundColor: 'action.selected' },
                },
              }}
              onClick={() => {
                setActiveView(item.id)
                onClose()
              }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Box>

      {/* Bottom-right close button */}
      <Box
        sx={{
          p: 1,
          display: 'flex',
          justifyContent: 'flex-end',
          borderTop: 1,
          borderColor: 'divider',
        }}
      >
        <IconButton aria-label="Close menu" onClick={onClose} size="large">
          <MenuOpen />
        </IconButton>
      </Box>

    </Drawer>
  )
}

export { drawerWidth }