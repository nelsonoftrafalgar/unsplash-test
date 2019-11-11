import { ActionType, DynamicAssignProp, IAction, ICollectionParams, ICollectionPreview } from '../utils/model'

import { toJson } from 'unsplash-js'
import { unsplash } from './unsplash'

export const getCollections = (collectionParams: ICollectionParams[], dispatch: React.Dispatch<IAction>, actionType: ActionType, page: number) => {
  const collectionsArray: DynamicAssignProp[] = [] 

  Promise.all(collectionParams.map((collection: ICollectionParams) => {
    return unsplash.collections.getCollectionPhotos(collection.id, page, 18, 'latest').then(toJson)
  }))
    .then((data: any) => {
      
      data.forEach((item: any, i: number) => { 
        const collection: DynamicAssignProp = {
          id: collectionParams[i].id,
          title: collectionParams[i].name,
          photos: []
        }
        
        item.forEach((el: any) => {
          const photo: DynamicAssignProp = {}
          
          photo.id = el.id
          photo.src = el.urls.thumb
          photo.alt = el.alt_description
          photo.likes = el.likes
          photo.createdAt = el.created_at

          collection.photos.push(photo)
        })
        collectionsArray.push(collection)
      })
      dispatch({type: actionType, payload: collectionsArray as ICollectionPreview[]})
    })
    .catch((error) => {
      console.error(error)
    })
}