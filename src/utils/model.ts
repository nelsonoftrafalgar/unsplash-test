export interface IDynamicAssignProp { [key: string]: any }

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
  activeSort: ISortOption | undefined
  handleSortChange: (sort: ISortOption | undefined) => void
}

export interface IAppState {
  collections: ICollectionPreview[]
  currentCollection: ICollectionPreview
}

export type ActionPayload = ICollectionPreview[]

export type ActionType =
| 'GET_COLLECTIONS'
| 'GET_CURRENT_COLLECTION'
| 'LOAD_MORE_PHOTOS'
| 'CLEAR_CURRENT_COLLECTION'

export interface IAction {
  type: ActionType
  payload: ActionPayload
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

export interface IPhotoModalProps {
  handleModalView: (toggle: boolean, id: string) => () => void
  selecetdPhotoId: string
}
