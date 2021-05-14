import { CLEAR_CURRENT_COLLECTION, GET_CURRENT_COLLECTION, LOAD_MORE_PHOTOS } from './actions'
import { IAction, IAppState } from './model'

export const reducer = (state: IAppState, action: IAction): IAppState => {
  switch (action.type) {
    case GET_CURRENT_COLLECTION:
      return {
        ...state,
        currentCollection: action.payload[0],
      }
    case LOAD_MORE_PHOTOS:
      return {
        ...state,
        currentCollection: {
          ...state.currentCollection,
          photos: [...state.currentCollection.photos!, ...action.payload[0].photos!],
        },
      }
    case CLEAR_CURRENT_COLLECTION:
      return {
        ...state,
        currentCollection: action.payload[0],
      }
    default:
      return state
  }
}
