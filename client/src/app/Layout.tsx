import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import SearchIcon from '@mui/icons-material/Search'
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer'
import {
  AppBar,
  Box,
  Chip,
  Divider,
  IconButton,
  Link as MuiLink,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { type PlayerMetricKey } from '../data/players'

const drawerWidth = 312
const contentMaxWidth = 1240

type Preset = {
  id: string
  title: string
  sortBy: PlayerMetricKey
  pos?: string
}

const presets: Preset[] = [
  { id: 'top-xg', title: 'Top xG', sortBy: 'xg' },
  { id: 'top-xag', title: 'Top xAG', sortBy: 'xag' },
  { id: 'top-goals', title: 'Goals', sortBy: 'gls' },
  { id: 'top-assists', title: 'Assists', sortBy: 'ast' },
  { id: 'most-minutes', title: 'Minutes', sortBy: 'min' },
  { id: 'most-cards', title: 'Discipline (cards)', sortBy: 'crdy' },
  { id: 'forwards-xg', title: 'Forwards xG', sortBy: 'xg', pos: 'FW' },
  { id: 'defenders-xg', title: 'Defenders xG', sortBy: 'xg', pos: 'DF' },
]

function applyPresetToSearchParams(preset: Preset) {
  const params = new URLSearchParams()
  params.set('sort', preset.sortBy)
  params.set('dir', 'desc')
  if (preset.pos) params.set('pos', preset.pos)
  return params
}

export function Layout() {
  const theme = useTheme()
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()

  const onPreset = (preset: Preset) => {
    setSearchParams(applyPresetToSearchParams(preset), { replace: location.pathname === '/' })
    if (location.pathname !== '/') navigate('/')
  }

  const activeSort = (searchParams.get('sort') ?? 'xg') as PlayerMetricKey
  const activePos = searchParams.get('pos') ?? ''

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ px: 2, py: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <SportsSoccerIcon fontSize="small" sx={{ color: 'primary.main' }} />
          <Typography variant="h6" sx={{ fontWeight: 900 }}>
            Premier Zone
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ mt: 0.5, color: 'text.secondary' }}>
          Player stats • leaderboards • profiles
        </Typography>
      </Box>

      <Divider />

      <Box sx={{ px: 2, py: 1.5 }}>
        <Typography variant="overline" sx={{ opacity: 0.8 }}>
          Leaderboards
        </Typography>
        <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Chip
            size="small"
            icon={<FilterAltIcon />}
            label={activePos ? `POS: ${activePos}` : 'All positions'}
            variant="outlined"
          />
          <Chip size="small" icon={<EmojiEventsIcon />} label={`Sort: ${activeSort}`} variant="outlined" />
        </Box>
      </Box>

      <List dense disablePadding sx={{ px: 1, pb: 1 }}>
        {presets.map((p) => (
          <ListItemButton
            key={p.id}
            onClick={() => onPreset(p)}
            selected={activeSort === p.sortBy && (p.pos ?? '') === activePos}
            sx={{
              borderRadius: 2,
              py: 0.75,
              my: 0.25,
              alignItems: 'center',
            }}
          >
            <ListItemIcon sx={{ minWidth: 34, display: 'grid', placeItems: 'center' }}>
              <EmojiEventsIcon fontSize="small" sx={{ color: 'text.secondary' }} />
            </ListItemIcon>
            <ListItemText
              primary={<Typography sx={{ fontWeight: 650 }}>{p.title}</Typography>}
              secondary={p.pos ? `Preset filter: ${p.pos}` : undefined}
              sx={{ my: 0 }}
            />
          </ListItemButton>
        ))}
      </List>

      <Box sx={{ flex: 1 }} />

      <Divider />

      <Box sx={{ px: 2, py: 2 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Tip: use search + filters to narrow down; click a player for the radar chart.
        </Typography>
        <Typography variant="caption" sx={{ display: 'block', mt: 0.75, color: 'text.secondary' }}>
          Style target: Cricinfo-like clean cards, red top bar.
        </Typography>
      </Box>
    </Box>
  )

  return (
    <Box sx={{ minHeight: '100%' }}>
      <AppBar position="fixed" elevation={0} sx={{ zIndex: (t) => t.zIndex.drawer + 1 }}>
        <Toolbar sx={{ gap: 2 }}>
          <Box sx={{ width: '100%', maxWidth: contentMaxWidth, mx: 'auto', display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SportsSoccerIcon fontSize="small" sx={{ color: '#FFFFFF' }} />
              <Typography variant="h6" sx={{ fontWeight: 900, letterSpacing: -0.2, color: '#FFFFFF' }}>
                premierzone
              </Typography>
            </Box>

            <Box sx={{ flex: 1 }} />

            <MuiLink
              href="#"
              underline="none"
              sx={{ color: 'rgba(255,255,255,0.92)', fontSize: 13, fontWeight: 650, display: { xs: 'none', sm: 'inline' } }}
            >
              Live Scores
            </MuiLink>
            <MuiLink
              href="#"
              underline="none"
              sx={{ color: 'rgba(255,255,255,0.92)', fontSize: 13, fontWeight: 650, display: { xs: 'none', sm: 'inline' } }}
            >
              Teams
            </MuiLink>
            <MuiLink
              href="#"
              underline="none"
              sx={{ color: 'rgba(255,255,255,0.92)', fontSize: 13, fontWeight: 650, display: { xs: 'none', sm: 'inline' } }}
            >
              News
            </MuiLink>
            <MuiLink
              href="#"
              underline="none"
              sx={{ color: 'rgba(255,255,255,0.92)', fontSize: 13, fontWeight: 650, display: { xs: 'none', sm: 'inline' } }}
            >
              Stats
            </MuiLink>

            <Tooltip title="Search and filters live on Players page">
              <span>
                <IconButton disabled size="small" sx={{ color: 'rgba(255,255,255,0.92)' }}>
                  <SearchIcon fontSize="small" />
                </IconButton>
              </span>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Push content below the fixed AppBar */}
      <Toolbar />

      <Box sx={{ backgroundColor: 'background.default', minHeight: 'calc(100% - 52px)' }}>
        <Box
          sx={{
            width: '100%',
            maxWidth: contentMaxWidth,
            mx: 'auto',
            px: { xs: 1.5, md: 2 },
            py: { xs: 2, md: 3 },
            display: 'flex',
            gap: { xs: 2, md: 3 },
            alignItems: 'flex-start',
          }}
        >
          {/* Desktop sidebar inside max-width container */}
          {mdDown ? null : (
            <Box sx={{ width: drawerWidth, flexShrink: 0 }}>
              <Paper
                sx={{
                  position: 'sticky',
                  top: 76,
                  overflow: 'hidden',
                }}
              >
                {drawerContent}
              </Paper>
            </Box>
          )}

          <Box component="main" sx={{ flexGrow: 1, minWidth: 0 }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

