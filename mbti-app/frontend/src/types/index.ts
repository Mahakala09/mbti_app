export interface Question {
  t: string
  o: [string, string]
  d: 'EI' | 'SN' | 'TF' | 'JP'
  w: [number, number]
}

export interface DimScore {
  left: string
  right: string
  key: 'EI' | 'SN' | 'TF' | 'JP'
  pct: number
  dom: string
}

export interface Scores {
  E: number; I: number
  S: number; N: number
  T: number; F: number
  J: number; P: number
}

export interface Profile {
  name: string
  desc: string
  careers: string[]
  compat: string[]
  color: string
  bg: string
}

export interface HistoryRecord {
  type: string
  name: string
  date: string
  dims: DimScore[]
}
