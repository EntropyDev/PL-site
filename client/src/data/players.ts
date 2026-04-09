export type PlayerPosition = 'GK' | 'DF' | 'MF' | 'FW'

export type Player = {
  name: string
  team: string
  nation: string
  pos: PlayerPosition
  age: number
  mp: number
  starts: number
  min: number
  gls: number
  ast: number
  pk: number
  crdy: number
  crdr: number
  xg: number
  xag: number
}

export type PlayerMetricKey =
  | 'min'
  | 'gls'
  | 'ast'
  | 'xg'
  | 'xag'
  | 'crdy'
  | 'crdr'

export const players: Player[] = [
  {
    age: 24,
    ast: 0.0,
    crdr: 0.0,
    crdy: 2.0,
    gls: 2.0,
    min: 1260.0,
    mp: 14,
    name: 'Gabriel Dos Santos',
    nation: 'br BRA',
    pk: 0.0,
    pos: 'DF',
    starts: 14,
    team: 'Arsenal',
    xag: 0.2,
    xg: 2.3,
  },
  {
    age: 24,
    ast: 0.0,
    crdr: 0.0,
    crdy: 0.0,
    gls: 0.0,
    min: 1260.0,
    mp: 14,
    name: 'Aaron Ramsdale',
    nation: 'eng ENG',
    pk: 0.0,
    pos: 'GK',
    starts: 14,
    team: 'Arsenal',
    xag: 0.0,
    xg: 0.0,
  },
  {
    age: 21,
    ast: 1.0,
    crdr: 0.0,
    crdy: 4.0,
    gls: 2.0,
    min: 1245.0,
    mp: 14,
    name: 'William Saliba',
    nation: 'fr FRA',
    pk: 0.0,
    pos: 'DF',
    starts: 14,
    team: 'Arsenal',
    xag: 0.9,
    xg: 0.3,
  },
  {
    age: 25,
    ast: 5.0,
    crdr: 0.0,
    crdy: 4.0,
    gls: 5.0,
    min: 1219.0,
    mp: 14,
    name: 'Gabriel Jesus',
    nation: 'br BRA',
    pk: 0.0,
    pos: 'FW',
    starts: 14,
    team: 'Arsenal',
    xag: 2.8,
    xg: 7.7,
  },
]

export function playerIdFromName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function findPlayerById(playerId: string): Player | undefined {
  return players.find((p) => playerIdFromName(p.name) === playerId)
}

