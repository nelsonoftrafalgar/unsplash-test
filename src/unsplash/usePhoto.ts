import { useEffect, useState } from 'react'

import { UNSPLASH } from '../utils/constants'

interface ISinglePhoto {
  id: string
  downloads: number
  createdAt: string
  likes: number
  author: string
  views: number
  url: string
  alt: string
}

interface IResponsePhoto {
  response?: {
    id: string
    downloads: number
    alt_description: string
    created_at: string
    likes: number
    user: {
      name: string
    }
    views: number
    urls: {
      regular: string
    }
  }
}

const getSinglePhoto = async (photoId: string) => {
  return (await UNSPLASH.photos.get({ photoId })) as IResponsePhoto
}

const parseResponse = ({ response }: IResponsePhoto) => {
  if (!response) return null
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

export const usePhoto = (selecetdPhotoId: string) => {
  const [singlePhoto, setSinglePhoto] = useState<ISinglePhoto | null>(null)

  const getPhoto = async (photoId: string) => {
    const response = await getSinglePhoto(photoId)
    const photo = parseResponse(response)
    setSinglePhoto(photo)
  }

  useEffect(() => {
    getPhoto(selecetdPhotoId)
  }, [selecetdPhotoId])

  return singlePhoto
}
