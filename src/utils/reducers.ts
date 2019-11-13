import {
  CLEAR_CURRENT_COLLECTION,
  CLEAR_SINGLE_PHOTO,
  GET_COLLECTIONS,
  GET_CURRENT_COLLECTION,
  GET_SINGLE_PHOTO,
  LOAD_MORE_PHOTOS
} from './actions'
import { IAction, IAppState } from './model'

export const reducer = (state: IAppState, action: IAction<any>): IAppState => {
  switch (action.type) {
    case GET_COLLECTIONS:
      return {
        ...state,
        collections: action.payload
      }
    case GET_CURRENT_COLLECTION:
      return {
        ...state,
        currentCollection: action.payload[0]
      }
    case LOAD_MORE_PHOTOS:
      return {
        ...state,
        currentCollection: {
          ...state.currentCollection,
          photos: [...state.currentCollection.photos, ...action.payload[0].photos]
        }
      }
    case CLEAR_CURRENT_COLLECTION:
      return {
        ...state,
        currentCollection: action.payload[0]
      }
    case GET_SINGLE_PHOTO:
      return {
        ...state,
        singlePhoto: action.payload
      }
    case CLEAR_SINGLE_PHOTO:
      return {
        ...state,
        singlePhoto: action.payload
      }
    default:
      return state
  }
}
