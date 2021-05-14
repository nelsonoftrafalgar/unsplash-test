import { FC, useReducer } from 'react'

import { Context } from '../utils/context'
import { IAppState } from '../utils/model'
import { reducer } from '../utils/reducers'

const Store: FC = ({ children }) => {
  const initialState: IAppState = {
    collections: [],
    currentCollection: {
      id: 0,
      title: '',
      slug: '',
      photos: [],
    },
  }

  const [appState, dispatch] = useReducer(reducer, initialState)
  const { collections, currentCollection } = appState

  return (
    <Context.Provider
      value={{
        collections,
        dispatch,
        currentCollection,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Store
