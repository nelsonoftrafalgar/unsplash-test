export interface ICollectionParams {
  id: number
  name: string
  slug: string
}

export interface IPrevievPhoto {
  id: string
  alt: string
  src: string
  likes: number
  createdAt: string
}

export interface ISortOption {
  label: string
  value: string
}
