import { COLLECTION_PARAMS, UNSPLASH } from '../utils/constants'

import { useInfiniteQuery } from 'react-query'

interface IResponse {
  results?: Array<{
    id: string
    urls: { thumb: string }
    alt_description: string
    likes: number
    created_at: string
  }>
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
    return collection.results?.map(({ id, urls: { thumb }, alt_description, likes, created_at }) => {
      return {
        id,
        src: thumb,
        alt: alt_description,
        likes,
        createdAt: created_at,
      }
    })
  })
  return {
    id: currentCollection?.id,
    title: currentCollection?.name,
    slug: currentCollection?.slug,
    photos,
  }
}

export const useCollection = (id: number) => {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['collection', id],
    ({ pageParam = 1 }) => getPhotos(id, pageParam),
    {
      refetchOnMount: false,
      getNextPageParam: (lastPage) => (lastPage.results?.length ? lastPage.nextPage : undefined),
    }
  )
  const currentCollection = parseReponse(id, data?.pages)

  return { fetchNextPage, hasNextPage, currentCollection }
}
