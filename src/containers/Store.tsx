import React, { useEffect, useReducer } from 'react'

import { COLLECTION_PARAMS } from '../utils/data'
import { Context } from '../utils/context'
import { GET_COLLECTIONS } from '../utils/actions'
import { IAppState } from '../utils/model'
import { getCollections } from '../helpers/getCollections'
import { reducer } from '../utils/reducers'

const Store: React.FC = ({children}) => {

  const initialState: IAppState = {
    collections: [],
    currentCollection: {
      id: 0,
      title: '',
      photos: []
    },
    singlePhoto: null
  }
  
  const [appState, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    getCollections(COLLECTION_PARAMS, dispatch, GET_COLLECTIONS, 1)
  }, [])

  return (
    <Context.Provider value={{
      collections: appState.collections,
      dispatch,
      currentCollection: appState.currentCollection,
      singlePhoto: appState.singlePhoto
    }}>
      {children}
    </Context.Provider>
  )
}

export default Store
