export interface ICollectionParams {
  id: number
  name: string
  slug: string
}

export interface IPhoto {
  id: string
  urls: { thumb: string }
  alt_description: string
  likes: number
  created_at: string
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
