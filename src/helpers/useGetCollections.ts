import { DynamicAssignProp, ICollectionParams, ICollectionPreview } from "../utils/model"
import Unsplash, { toJson } from "unsplash-js"
import { useEffect, useState } from "react"

export const useGetCollections = (collectionParams: ICollectionParams[], unsplash: Unsplash) => {
  const [collections, setCollections] = useState<ICollectionPreview[]>([])

  useEffect(() => {
    Promise.all(collectionParams.map((collection: ICollectionParams) => {
      return unsplash.collections.getCollectionPhotos(collection.id, 1, 10, 'latest').then(toJson)
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

          setCollections((collections) => [...collections, collection as ICollectionPreview])
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  return collections
}