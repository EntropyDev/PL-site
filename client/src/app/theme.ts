import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Palette {
    brand: {
      cricinfoBlue: string
      link: string
    }
  }
  interface PaletteOptions {
    brand?: {
      cricinfoBlue?: string
      link?: string
    }
  }
}

export const appTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#0B5FAE' }, // Cricinfo header blue
    secondary: { main: '#1E6BD6' },
    brand: {
      cricinfoBlue: '#0B5FAE',
      link: '#1E6BD6',
    },
    text: {
      primary: '#1B1F24',
      secondary: '#5B6672',
    },
    background: {
      default: '#F4F5F7',
      paper: '#FFFFFF',
    },
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily:
      'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
    h5: { fontWeight: 800, letterSpacing: -0.2 },
    h6: { fontWeight: 800, letterSpacing: -0.15 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#F4F5F7',
        },
        a: {
          color: '#1E6BD6',
          textDecoration: 'none',
        },
        'a:hover': {
          textDecoration: 'underline',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          border: '1px solid rgba(16, 24, 40, 0.08)',
          boxShadow: '0 1px 0 rgba(16, 24, 40, 0.04)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#0B5FAE',
          color: '#FFFFFF',
          borderBottom: '1px solid rgba(0,0,0,0.10)',
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: 52,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(16, 24, 40, 0.18)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundImage: 'none',
          backgroundColor: '#FFFFFF',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: 'rgba(11, 95, 174, 0.10)',
          },
          '&.Mui-selected:hover': {
            backgroundColor: 'rgba(11, 95, 174, 0.14)',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          minHeight: 40,
        },
        indicator: {
          height: 3,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          minHeight: 40,
          textTransform: 'none',
          fontWeight: 700,
          fontSize: 14,
        },
      },
    },
  },
})

