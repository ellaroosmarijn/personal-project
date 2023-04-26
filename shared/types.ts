export type Answer = string

export interface CoreReducer {
  viewpoint?: string
  topic?: string
  keepTopic?: boolean
  score?: number
  justification?: string
}

export interface Score {
  rating: number
  justification: string
}

export type Viewpoint = string

export interface ChildrenProps {
  children: React.ReactNode | React.ReactNode[]
}
