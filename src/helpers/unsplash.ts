import { API_KEY } from '../api-keys'
import Unsplash from 'unsplash-js'

// @ts-ignore
export const unsplash = new Unsplash({accessKey: API_KEY})
