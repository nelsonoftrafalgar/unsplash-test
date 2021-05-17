import { ICollectionParams, ISortOption } from './model'

import { createApi } from 'unsplash-js'

export const COLLECTION_PARAMS: ICollectionParams[] = [
  { id: 162326, name: 'Dark Portraits', slug: 'dark_portraits' },
  { id: 1901880, name: 'Spooky', slug: 'spooky' },
  { id: 1971015, name: 'Simplicity', slug: 'simplicity' },
  { id: 172974, name: 'Overseen', slug: 'overseen' },
  { id: 3323575, name: 'Candy', slug: 'candy' },
  { id: 181581, name: 'Animals', slug: 'animals' },
]

export const SORT_OPTIONS: ISortOption[] = [
  { value: 'date', label: 'newest' },
  { value: 'likes', label: 'most popular' },
]
export const UNSPLASH = createApi({ accessKey: process.env.API_KEY as string })
