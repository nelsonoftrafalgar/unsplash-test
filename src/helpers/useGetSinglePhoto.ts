import { IAction, IDynamicAssignProp, ISinglePhoto } from '../utils/model'

import { GET_SINGLE_PHOTO } from '../utils/actions'
import { toJson } from 'unsplash-js'
import { unsplash } from './unsplash'
import { useEffect } from 'react'

export const useGetSinglePhoto = (dispatch: React.Dispatch<IAction<ISinglePhoto>>, selecetdPhotoId: string) => {
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

        dispatch({type: GET_SINGLE_PHOTO, payload: singlePhoto as ISinglePhoto})
      })
  }, [])
}
