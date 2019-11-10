export type DynamicAssignProp = { [key: string]: any }

export interface ICollectionParams {
  id: number
  name: string
}

export interface IPrevievPhoto {
  id: string
  alt: string
  src: string
  likes: number
  createdAt: string
}

export interface ICollectionPreview {
  id: number
  title: string
  photos: IPrevievPhoto[]
}

export interface IContext {
  collections: ICollectionPreview[]
}

export interface ICollectionProps {
  id: number
}

export interface ISortOption {
  label: string
  value: string
}

export interface ISortProps {
  title: string
  activeSort: ISortOption | null
  handleSortChange: (sort: ISortOption | null) => void
}