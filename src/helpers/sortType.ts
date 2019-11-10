import { IPrevievPhoto, ISortOption } from '../utils/model'

export const sortType = (sortType: ISortOption | null) => (a: IPrevievPhoto, b: IPrevievPhoto) => {
  const convert = (str: string) => +str.replace(/[^0-9]/g, '')
  
  if (!sortType) {
    return 0
  } else if (sortType.value === 'likes') {
    return b.likes - a.likes
  } else {
    return convert(b.createdAt) - convert(a.createdAt)
  }
}