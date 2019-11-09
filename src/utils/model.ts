export type DynamicAssignProp = { [key: string]: any }

export interface ICollectionParams {
  id: number
  name: string
}

export interface IPrevievPhoto {
  id: string
  alt: string
  src: string
}

export interface ICollectionPreview {
  id: number
  title: string
  photos: IPrevievPhoto[]
}

export interface IContext {
  collections: ICollectionPreview[]
}