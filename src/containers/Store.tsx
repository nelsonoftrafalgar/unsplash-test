import { API_KEY } from '../api-keys'
import { Context } from '../utils/context'
import { ICollectionParams } from '../utils/model'
import React from 'react'
import Unsplash from 'unsplash-js'
import { useGetCollections } from '../helpers/useGetCollections'

// @ts-ignore
const unsplash = new Unsplash({accessKey: API_KEY})

const COLLECTION_PARAMS: ICollectionParams[] = [
  {id: 162326, name: 'Dark Portraits'},
  {id: 1901880, name: 'Spooky'},
  {id: 1971015, name: 'Simplicity'},
  {id: 172974, name: 'Overseen'},
  {id: 3323575, name: 'Candy'},
  {id: 181581, name: 'Animals'}
]

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
