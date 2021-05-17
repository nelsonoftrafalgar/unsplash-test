import { useCallback, useRef, useState } from 'react'

import CollectionPhoto from '../components/CollectionPhoto'
import { ISortOption } from '../utils/model'
import PhotoModal from '../components/PhotoModal'
import Sort from '../components/Sort'
import { breakpoint } from '../styles/breakpoints'
import { sortType } from '../helpers/sortType'
import styled from 'styled-components'
import { useCollection } from '../unsplash/useCollection'
import { variables } from '../styles/variables'

const { fontColor, bgColor, breakpointSmall, fontSize3, fontFamily } = variables

const Wrapper = styled.section`
  width: 100%;
  min-height: 100vh;
  background: ${bgColor};
  display: flex;
  justify-content: space-evenly;
  padding: 20px 0;
  flex-direction: column;
  align-items: center;
  ${breakpoint(
    breakpointSmall,
    `
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: center;
  `
  )}
`

const Loading = styled.span`
  color: ${fontColor};
  font-size: ${fontSize3};
  font-family: ${fontFamily};
`

interface IProps {
  id: number
}

const Collection: React.FC<IProps> = ({ id }) => {
  const [isModalOn, setIsModalOn] = useState(false)
  const [activeSort, setActiveSort] = useState<ISortOption | null>(null)
  const [selecetdPhotoId, setSelecetdPhotoId] = useState('')
  const observer = useRef<IntersectionObserver>()
  const initialRender = useRef(true)
  const { fetchNextPage, hasNextPage, currentCollection, isLoading } = useCollection(id)
  const collectionTitle = currentCollection ? currentCollection.title : 'Loading...'

  const handleSortChange = useCallback((sort: ISortOption | null) => {
    setActiveSort(sort)
  }, [])

  const handleModalView = useCallback(
    (toggle: boolean, photoId?: string) => () => {
      document.body.style.overflow = toggle ? 'hidden' : 'visible'
      setIsModalOn(toggle)
      if (photoId) {
        setSelecetdPhotoId(photoId)
      }
    },
    []
  )

  const lastPhotoRef = useCallback(
    (node) => {
      if (observer.current) {
        observer.current.disconnect()
      }
      observer.current = new IntersectionObserver(
        (entries) => {
          if (!initialRender.current && entries[0].isIntersecting && hasNextPage) {
            fetchNextPage()
          }
          initialRender.current = false
        },
        { threshold: 0.25 }
      )
      if (node) {
        observer.current.observe(node)
      }
    },
    [fetchNextPage, hasNextPage]
  )

  const renderPhotos = currentCollection.photos?.sort(sortType(activeSort)).map((photo, i, arr) => {
    const props = {
      ...photo,
      handleModalView,
      lastPhotoRef: arr.length === i + 1 ? lastPhotoRef : undefined,
    }

    return <CollectionPhoto key={photo?.id} {...props} />
  })

  return (
    <>
      <Sort title={collectionTitle} activeSort={activeSort} handleSortChange={handleSortChange} />
      <Wrapper>{isLoading ? <Loading>Loading...</Loading> : renderPhotos}</Wrapper>
      {isModalOn && <PhotoModal selecetdPhotoId={selecetdPhotoId} handleModalView={handleModalView} />}
    </>
  )
}

export default Collection
