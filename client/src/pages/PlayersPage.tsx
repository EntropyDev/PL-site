import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import {
  Box,
  Card,
  CardContent,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import { Link, useSearchParams } from 'react-router-dom'
import { players, playerIdFromName, type Player, type PlayerMetricKey, type PlayerPosition } from '../data/players'
import { useMemo } from 'react'

const metricLabels: Record<PlayerMetricKey, string> = {
  min: 'Minutes',
  gls: 'Goals',
  ast: 'Assists',
  xg: 'xG',
  xag: 'xAG',
  crdy: 'Yellow cards',
  crdr: 'Red cards',
}

function toNumber(v: unknown): number {
  if (typeof v === 'number') return v
  const n = Number(v)
  return Number.isFinite(n) ? n : 0
}

function sortPlayers(list: Player[], sortBy: PlayerMetricKey, dir: 'asc' | 'desc') {
  const m = dir === 'asc' ? 1 : -1
  return [...list].sort((a, b) => (toNumber(a[sortBy]) - toNumber(b[sortBy])) * m)
}

export function PlayersPage() {
  const [searchParams, setSearchParams] = useSearchParams()

  const q = (searchParams.get('q') ?? '').trim()
  const team = searchParams.get('team') ?? ''
  const pos = (searchParams.get('pos') ?? '') as PlayerPosition | ''
  const sort = (searchParams.get('sort') ?? 'xg') as PlayerMetricKey
  const dir = (searchParams.get('dir') ?? 'desc') as 'asc' | 'desc'

  const teams = useMemo(() => Array.from(new Set(players.map((p) => p.team))).sort(), [])
  const positions: PlayerPosition[] = ['GK', 'DF', 'MF', 'FW']

  const filtered = useMemo(() => {
    const byText = (p: Player) => {
      if (!q) return true
      const hay = `${p.name} ${p.team} ${p.nation} ${p.pos}`.toLowerCase()
      return hay.includes(q.toLowerCase())
    }
    const byTeam = (p: Player) => (team ? p.team === team : true)
    const byPos = (p: Player) => (pos ? p.pos === pos : true)
    return sortPlayers(players.filter((p) => byText(p) && byTeam(p) && byPos(p)), sort, dir)
  }, [q, team, pos, sort, dir])

  const update = (patch: Record<string, string>) => {
    const next = new URLSearchParams(searchParams)
    Object.entries(patch).forEach(([k, v]) => {
      if (!v) next.delete(k)
      else next.set(k, v)
    })
    setSearchParams(next, { replace: true })
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.25 }}>
      <Box>
        <Typography variant="h5">Premier League-style player stats</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
          Search, filter, and use the sidebar leaderboards to jump to common presets.
        </Typography>
      </Box>

      <Card>
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 1.25,
              alignItems: { md: 'center' },
            }}
          >
            <TextField
              label="Search players / teams"
              value={q}
              onChange={(e) => update({ q: e.target.value })}
              fullWidth
            />
            <FormControl sx={{ minWidth: 170 }}>
              <InputLabel id="team-label">Team</InputLabel>
              <Select
                labelId="team-label"
                label="Team"
                value={team}
                onChange={(e) => update({ team: e.target.value })}
              >
                <MenuItem value="">All</MenuItem>
                {teams.map((t) => (
                  <MenuItem key={t} value={t}>
                    {t}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 140 }}>
              <InputLabel id="pos-label">Pos</InputLabel>
              <Select labelId="pos-label" label="Pos" value={pos} onChange={(e) => update({ pos: e.target.value })}>
                <MenuItem value="">All</MenuItem>
                {positions.map((p) => (
                  <MenuItem key={p} value={p}>
                    {p}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 160 }}>
              <InputLabel id="sort-label">Sort</InputLabel>
              <Select
                labelId="sort-label"
                label="Sort"
                value={sort}
                onChange={(e) => update({ sort: e.target.value })}
              >
                {(Object.keys(metricLabels) as PlayerMetricKey[]).map((k) => (
                  <MenuItem key={k} value={k}>
                    {metricLabels[k]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 140 }}>
              <InputLabel id="dir-label">Dir</InputLabel>
              <Select
                labelId="dir-label"
                label="Dir"
                value={dir}
                onChange={(e) => update({ dir: e.target.value })}
              >
                <MenuItem value="desc">Desc</MenuItem>
                <MenuItem value="asc">Asc</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ mt: 1.5, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip size="small" label={`${filtered.length} players`} variant="outlined" />
            {q ? <Chip size="small" label={`Query: ${q}`} onDelete={() => update({ q: '' })} /> : null}
            {team ? <Chip size="small" label={`Team: ${team}`} onDelete={() => update({ team: '' })} /> : null}
            {pos ? <Chip size="small" label={`Pos: ${pos}`} onDelete={() => update({ pos: '' })} /> : null}
          </Box>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 1.25 }}>
            Leaderboard ({metricLabels[sort]})
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {filtered.map((p) => {
              const id = playerIdFromName(p.name)
              return (
                <Box
                  key={p.name}
                  component={Link}
                  to={`/players/${id}`}
                  sx={{
                    textDecoration: 'none',
                    color: 'inherit',
                    p: 1.25,
                    borderRadius: 2,
                    border: '1px solid rgba(16, 24, 40, 0.10)',
                    backgroundColor: '#FFFFFF',
                    '&:hover': {
                      borderColor: 'rgba(217, 34, 42, 0.35)',
                      boxShadow: '0 8px 18px rgba(16, 24, 40, 0.10)',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box sx={{ minWidth: 0, flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
                        <Typography sx={{ fontWeight: 750, minWidth: 0 }} noWrap>
                          {p.name}
                        </Typography>
                        <Chip size="small" label={p.pos} variant="outlined" />
                        <Chip size="small" label={p.team} variant="outlined" />
                      </Box>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {p.nation} • Age {p.age} • {p.mp} MP • {p.starts} starts
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography sx={{ fontWeight: 850 }}>
                          {Number(p[sort]).toFixed(sort === 'min' ? 0 : 1)}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          {metricLabels[sort]}
                        </Typography>
                      </Box>
                      <OpenInNewIcon fontSize="small" />
                    </Box>
                  </Box>
                </Box>
              )
            })}
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

