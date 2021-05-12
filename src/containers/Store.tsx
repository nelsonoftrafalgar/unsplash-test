import React, { FC, useEffect, useReducer } from 'react'

import { COLLECTION_PARAMS } from '../utils/data'
import { Context } from '../utils/context'
import { GET_COLLECTIONS } from '../utils/actions'
import { IAppState } from '../utils/model'
import { getCollections } from '../helpers/getCollections'
import { reducer } from '../utils/reducers'

const Store: FC = ({ children }) => {
	const initialState: IAppState = {
		collections: [],
		currentCollection: {
			id: 0,
			title: '',
			slug: '',
			photos: [],
		},
	}

	const [appState, dispatch] = useReducer(reducer, initialState)

	useEffect(() => {
		getCollections(COLLECTION_PARAMS, dispatch, GET_COLLECTIONS, 1)
	}, [])

	const { collections, currentCollection } = appState

	return (
		<Context.Provider
			value={{
				collections,
				dispatch,
				currentCollection,
			}}
		>
			{children}
		</Context.Provider>
	)
}

export default Store
