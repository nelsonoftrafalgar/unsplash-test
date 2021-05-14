import React, { FC, useEffect, useReducer } from 'react'
import { getCollections, parseCollectionsReponse } from '../helpers/unsplash'

import { Context } from '../utils/context'
import { GET_COLLECTIONS } from '../utils/actions'
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

  const getTestCollections = async () => {
    const response = await getCollections()
    const collections = parseCollectionsReponse(response)
    dispatch({ type: GET_COLLECTIONS, payload: collections })
  }

  useEffect(() => {
    getTestCollections()
  }, [])

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
