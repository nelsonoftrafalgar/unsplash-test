import { API_KEY } from '../api-keys'
import { COLLECTION_PARAMS } from '../utils/data'
import { createApi } from 'unsplash-js'

const unsplash = createApi({ accessKey: API_KEY })

export const getSinglePhoto = async (photoId: string) => {
  return await unsplash.photos.get({ photoId })
}

export const getCollectionPhotos = async (collectionId: number, page: number) => {
  return await unsplash.collections.getPhotos({
    collectionId: collectionId.toString(),
    page,
    perPage: 20,
  })
}

export const getCollections = async () => {
  return await Promise.all(
    COLLECTION_PARAMS.map((collection) => {
      return unsplash.collections.getPhotos({ collectionId: collection.id.toString() })
    })
  )
}

interface ICollectionsResponse {
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

export const parseCollectionsReponse = (collections?: ICollectionsResponse[]) => {
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

export const parseSinglePhotoResponse = ({ response }: any) => {
  return {
    id: response.id,
    downloads: response.downloads,
    alt: response.alt_description,
    createdAt: response.created_at,
    likes: response.likes,
    author: response.user.name,
    views: response.views,
    url: response.urls.regular,
  }
}
