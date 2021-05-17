import { COLLECTION_PARAMS, UNSPLASH } from '../utils/constants'

import { IPhoto } from '../utils/model'
import { parsePhoto } from '../helpers/parsePhoto'
import { useInfiniteQuery } from 'react-query'

interface IResponse {
  results?: IPhoto[]
  nextPage: number
}

const getPhotos = async (collectionId: number, page: number) => {
  const data = await UNSPLASH.collections.getPhotos({
    collectionId: collectionId.toString(),
    page,
    perPage: 25,
    orientation: 'landscape',
  })

  return {
    results: data.response?.results,
    nextPage: page + 1,
  }
}

const parseReponse = (collectionId: number, collections?: IResponse[]) => {
  const currentCollection = COLLECTION_PARAMS.find((collection) => collection.id === collectionId)
  const photos = collections?.flatMap((collection) => {
    return collection.results?.map(parsePhoto)
  })
  return {
    id: currentCollection?.id,
    title: currentCollection?.name,
    slug: currentCollection?.slug,
    photos,
  }
}

export const useCollection = (id: number) => {
  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery(
    ['collection', id],
    ({ pageParam = 1 }) => getPhotos(id, pageParam),
    {
      refetchOnMount: false,
      getNextPageParam: (lastPage) => (lastPage.results?.length ? lastPage.nextPage : undefined),
    }
  )
  const currentCollection = parseReponse(id, data?.pages)

  return { fetchNextPage, hasNextPage, currentCollection, isLoading }
}
