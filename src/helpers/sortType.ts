import { IPrevievPhoto, ISortOption } from '../utils/model'

export const sortType = (type?: ISortOption) => (a?: IPrevievPhoto, b?: IPrevievPhoto) => {
  const convert = (str: string) => +str.replace(/[^0-9]/g, '')

  if (!a || !b) return 0

  switch (type?.value) {
    case 'likes':
      return b.likes - a.likes
    case 'date':
      return convert(b.createdAt) - convert(a.createdAt)
    default:
      return 0
  }
}
