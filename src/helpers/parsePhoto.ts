import { IPhoto } from '../utils/model'

export const parsePhoto = ({ id, urls: { thumb }, alt_description, likes, created_at }: IPhoto) => ({
  id,
  src: thumb,
  alt: alt_description,
  likes,
  createdAt: created_at,
})
