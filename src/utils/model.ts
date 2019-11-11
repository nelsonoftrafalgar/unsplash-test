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
  dispatch: React.Dispatch<IAction>
  currentCollection: ICollectionPreview
  singlePhoto: ISinglePhoto | null
}

export interface ICollectionProps {
  id: number
  name: string
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

export interface IAppState {
  collections: ICollectionPreview[]
  currentCollection: ICollectionPreview
  singlePhoto: ISinglePhoto | null
}

export type ActionType = 
| 'GET_COLLECTIONS'
| 'GET_CURRENT_COLLECTION'
| 'LOAD_MORE_PHOTOS' 
| 'CLEAR_CURRENT_COLLECTION'
| 'GET_SINGLE_PHOTO'
| 'CLEAR_SINGLE_PHOTO'

export type ActionPayload = ICollectionPreview[] 

export interface IAction {
  type: ActionType
  payload: any
}

export type PhotoRef = (node: HTMLDivElement) => void

export interface ICollectionPhotoProps extends IPrevievPhoto {
  handleModalView: (toggle: boolean, id: string) => () => void
  lastPhotoRef?: PhotoRef
}

export interface ISinglePhoto {
  id: string 
  downloads: number
  createdAt: string
  likes: number 
  author: string
  views: number 
  url: string 
  alt: string
}