import { COLLECTION_PARAMS, UNSPLASH } from '../utils/constants'

import { useQuery } from 'react-query'

interface IResponse {
  response?: {
    results: Array<{
      id: string
      urls: { thumb: string }
      alt_description: string
      likes: number
      created_at: string
    }>
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
    const photos = collection.response?.results.map(({ id, urls: { thumb }, alt_description, likes, created_at }) => {
      return {
        id,
        src: thumb,
        alt: alt_description,
        likes,
        createdAt: created_at,
      }
    })

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
