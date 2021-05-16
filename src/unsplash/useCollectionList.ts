import { COLLECTION_PARAMS, UNSPLASH } from '../utils/constants'

import { IPhoto } from '../utils/model'
import { parsePhoto } from '../helpers/parsePhoto'
import { useQuery } from 'react-query'

interface IResponse {
  response?: {
    results: IPhoto[]
  }
}

const getCollections = async () => {
  return await Promise.all(
    COLLECTION_PARAMS.map((collection) => {
      return UNSPLASH.collections.getPhotos({ collectionId: collection.id.toString() })
    })
  )
}

const parseReponse = (collections?: IResponse[]) => {
  return collections?.map((collection, idx) => {
    const photos = collection.response?.results.map(parsePhoto)

    return {
      id: COLLECTION_PARAMS[idx].id,
      title: COLLECTION_PARAMS[idx].name,
      slug: COLLECTION_PARAMS[idx].slug,
      photos,
    }
  })
}

export const useCollectionList = () => {
  const query = useQuery('collections', getCollections)
  return parseReponse(query.data)
}
