import { API_KEY } from '../api-keys'
import { COLLECTION_PARAMS } from '../utils/data'
import { Context } from '../utils/context'
import React from 'react'
import Unsplash from 'unsplash-js'
import { useGetCollections } from '../helpers/useGetCollections'

// @ts-ignore
const unsplash = new Unsplash({accessKey: API_KEY})

const Store: React.FC = ({children}) => {
  
  const collections = useGetCollections(COLLECTION_PARAMS, unsplash)

  return (
    <Context.Provider value={{
      collections
    }}>
      {children}
    </Context.Provider>
  )
}

export default Store
