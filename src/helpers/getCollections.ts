import {
	ActionType,
	IAction,
	ICollectionParams,
	ICollectionPreview,
	IDynamicAssignProp,
} from '../utils/model'

import { GET_COLLECTIONS } from '../utils/actions'
import { toJson } from 'unsplash-js'
import { unsplash } from './unsplash'

export const getCollections = (
	collectionParams: ICollectionParams[],
	dispatch: React.Dispatch<IAction>,
	actionType: ActionType,
	page: number
) => {
	const collectionsArray: IDynamicAssignProp[] = []
	const photoCount = actionType === GET_COLLECTIONS ? 10 : 18

	Promise.all(
		collectionParams.map(async (collection: ICollectionParams) => {
			return unsplash.collections
				.getCollectionPhotos(collection.id, page, photoCount, 'latest')
				.then(toJson)
		})
	)
		.then((data: any) => {
			for (const [i, item] of data.entries()) {
				const collection: IDynamicAssignProp = {
					id: collectionParams[i].id,
					title: collectionParams[i].name,
					slug: collectionParams[i].slug,
					photos: [],
				}

				for (const el of item) {
					const photo: IDynamicAssignProp = {}

					photo.id = el.id
					photo.src = el.urls.thumb
					photo.alt = el.alt_description
					photo.likes = el.likes
					photo.createdAt = el.created_at

					collection.photos.push(photo)
				}
				collectionsArray.push(collection)
			}

			dispatch({ type: actionType, payload: collectionsArray as ICollectionPreview[] })
		})
		.catch((error) => {
			throw new Error(error)
		})
}
