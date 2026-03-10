// src/styles/surfaces.ts
import type { Theme } from '@mui/material/styles'

export const displayCardSx = (theme: Theme) => ({
    width: '100%',
    height: '100%',
    borderRadius: 5,
    overflow: 'hidden',
    position: 'relative',

    // Theme-aware surfaces
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,

    // Use theme divider + subtle elevation that adapts to mode
    // border: '1px solid',
    borderColor: theme.palette.divider,
    boxShadow:
      theme.palette.mode === 'dark'
        ? '0 10px 28px rgba(0,0,0,0.45)'
        : '0 10px 24px rgba(2, 6, 23, 0.10)',

    // Keep your background-image behavior intact (if you later add an image)
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',

    // Nice interactive affordance (optional)
    transition: theme.transitions.create(['transform', 'box-shadow', 'border-color'], {
      duration: theme.transitions.duration.short,
    }),

    // If your child controls render MUI Buttons, these selectors help them
    // harmonize with your theme without needing changes inside those components.
    '& .MuiButton-root': {
    // borderRadius: 2, // matches your global button override
      textTransform: 'none',
    },
    '& .MuiButton-contained': {
      boxShadow: 'none',
    },
  })

export const SECTION_HEIGHT = 300
export const SECTION_WIDTH = 250