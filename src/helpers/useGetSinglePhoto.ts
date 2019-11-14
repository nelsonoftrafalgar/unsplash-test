import { IDynamicAssignProp, ISinglePhoto } from '../utils/model'
import { useEffect, useState } from 'react'

import { toJson } from 'unsplash-js'
import { unsplash } from './unsplash'

export const useGetSinglePhoto = (selecetdPhotoId: string): ISinglePhoto => {
  const [photo, setPhoto] = useState({} as ISinglePhoto)

  useEffect(() => {
    unsplash.photos.getPhoto(selecetdPhotoId)
      .then(toJson)
      .then((data: any) => {
        const singlePhoto: IDynamicAssignProp = {}

        singlePhoto.id = data.id
        singlePhoto.downloads = data.downloads
        singlePhoto.alt = data.alt_description
        singlePhoto.createdAt = data.created_at
        singlePhoto.likes = data.likes
        singlePhoto.author = data.user.name
        singlePhoto.views = data.views
        singlePhoto.url = data.urls.regular

        setPhoto(singlePhoto as ISinglePhoto)
      })
      .catch((error: string) => {
        throw new Error(error)
      })
  }, [])

  return photo
}
