import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Tab,
  Tabs,
  Typography,
} from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import { findPlayerById, players, type Player } from '../data/players'
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from 'recharts'
import { useMemo } from 'react'

type RadarRow = { metric: string; value: number; raw: number }

const radarMetrics: Array<{ key: keyof Player; label: string }> = [
  { key: 'xg', label: 'xG' },
  { key: 'xag', label: 'xAG' },
  { key: 'gls', label: 'Gls' },
  { key: 'ast', label: 'Ast' },
  { key: 'min', label: 'Min' },
  { key: 'crdy', label: 'YC' },
]

function maxForMetric(key: keyof Player): number {
  return Math.max(...players.map((p) => (typeof p[key] === 'number' ? (p[key] as number) : 0)), 0.0001)
}

function clamp01(x: number) {
  return Math.min(1, Math.max(0, x))
}

export function PlayerProfilePage() {
  const { playerId } = useParams()
  const player = playerId ? findPlayerById(playerId) : undefined
  const tab = 0

  const radarData: RadarRow[] = useMemo(() => {
    if (!player) return []
    return radarMetrics.map(({ key, label }) => {
      const raw = typeof player[key] === 'number' ? (player[key] as number) : 0
      const max = maxForMetric(key)
      const value = Math.round(clamp01(raw / max) * 100)
      return { metric: label, value, raw }
    })
  }, [player])

  if (!player) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h5">Player not found</Typography>
        <Button component={Link} to="/" startIcon={<ArrowBackIcon />} variant="contained">
          Back to players
        </Button>
      </Box>
    )
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.25 }}>
      <Card sx={{ overflow: 'hidden' }}>
        <Tabs value={tab} variant="scrollable" scrollButtons="auto">
          <Tab label="Overview" />
          <Tab label="Stats" />
          <Tab label="Records" />
          <Tab label="Matches" />
          <Tab label="Videos" />
          <Tab label="News" />
          <Tab label="Photos" />
        </Tabs>
      </Card>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Button component={Link} to="/" startIcon={<ArrowBackIcon />} variant="outlined">
          Players
        </Button>
        <Box sx={{ flex: 1 }} />
        <Chip size="small" label={player.team} variant="outlined" />
        <Chip size="small" label={player.pos} variant="outlined" />
      </Box>

      <Card>
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 2.5,
              alignItems: { md: 'center' },
            }}
          >
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="h5" sx={{ fontWeight: 900 }} noWrap>
                {player.name}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                {player.nation} • Age {player.age} • {player.mp} MP • {player.starts} starts
              </Typography>

              <Box sx={{ mt: 1.25, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip size="small" label={`Min: ${player.min.toFixed(0)}`} />
                <Chip size="small" label={`Gls: ${player.gls.toFixed(1)}`} />
                <Chip size="small" label={`Ast: ${player.ast.toFixed(1)}`} />
                <Chip size="small" label={`xG: ${player.xg.toFixed(1)}`} />
                <Chip size="small" label={`xAG: ${player.xag.toFixed(1)}`} />
              </Box>
            </Box>

            <Box
              sx={{
                width: { xs: '100%', md: 420 },
                height: 280,
                borderRadius: 3,
                border: '1px solid rgba(16, 24, 40, 0.10)',
                backgroundColor: '#FFFFFF',
                overflow: 'hidden',
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData} outerRadius="70%">
                  <PolarGrid stroke="rgba(16, 24, 40, 0.12)" />
                  <PolarAngleAxis dataKey="metric" tick={{ fill: 'rgba(27, 31, 36, 0.82)', fontSize: 12 }} />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, 100]}
                    tickCount={6}
                    tick={{ fill: 'rgba(27, 31, 36, 0.55)', fontSize: 10 }}
                    stroke="rgba(16, 24, 40, 0.10)"
                  />
                  <Radar
                    dataKey="value"
                    stroke="rgba(11, 95, 174, 0.95)"
                    fill="rgba(11, 95, 174, 0.14)"
                    strokeWidth={2}
                  />
                  <RechartsTooltip
                    formatter={(v: unknown) => `${v}%`}
                    contentStyle={{
                      background: '#FFFFFF',
                      border: '1px solid rgba(16, 24, 40, 0.12)',
                      borderRadius: 12,
                      color: '#1B1F24',
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6">Key output</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                Quick look at attacking contribution + discipline.
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1.25, flexWrap: 'wrap' }}>
              <Chip label={`PK: ${player.pk.toFixed(1)}`} variant="outlined" />
              <Chip label={`YC: ${player.crdy.toFixed(1)}`} variant="outlined" />
              <Chip label={`RC: ${player.crdr.toFixed(1)}`} variant="outlined" />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

