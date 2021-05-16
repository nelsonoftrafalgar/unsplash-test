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

export interface ICollectionPreview {
  id: number
  title: string
  slug: string
  photos?: IPrevievPhoto[]
}

export interface ICollectionProps {
  id: number
  name: string
  slug: string
}

export interface ISortOption {
  label: string
  value: string
}

export interface ISortProps {
  title?: string
  activeSort: ISortOption | undefined
  handleSortChange: (sort: ISortOption | undefined) => void
}

export type PhotoRef = (node: HTMLDivElement) => void

export interface ICollectionPhotoProps extends IPrevievPhoto {
  handleModalView: (toggle: boolean, id: string) => () => void
  lastPhotoRef?: PhotoRef
}

export interface IPhotoModalProps {
  handleModalView: (toggle: boolean, id: string) => () => void
  selecetdPhotoId: string
}
