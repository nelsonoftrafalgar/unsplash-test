import { CLEAR_CURRENT_COLLECTION, GET_CURRENT_COLLECTION, LOAD_MORE_PHOTOS } from '../utils/actions'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { getCollectionPhotos, parseCollectionsReponse } from '../helpers/unsplash'

import CollectionPhoto from '../components/CollectionPhoto'
import { Context } from '../utils/context'
import { ISortOption } from '../utils/model'
import PhotoModal from '../components/PhotoModal'
import Sort from '../components/Sort'
import { breakpoint } from '../styles/breakpoints'
import { sortType } from '../helpers/sortType'
import styled from 'styled-components'
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
  const { currentCollection, dispatch } = useContext(Context)
  const [isModalOn, setIsModalOn] = useState(false)
  const [activeSort, setActiveSort] = useState<ISortOption | undefined>(undefined)
  const [pageNumber, setPageNumber] = useState(1)
  const [selecetdPhotoId, setSelecetdPhotoId] = useState('')
  const observer = useRef<IntersectionObserver>()
  const initialRender = useRef(true)

  const getPhotos = async (type: any, pageNumber: number) => {
    const response = await getCollectionPhotos(id, pageNumber)
    const collection = parseCollectionsReponse([response])
    dispatch({ type, payload: collection! })
  }

  useEffect(() => {
    if (pageNumber === 1) {
      getPhotos(GET_CURRENT_COLLECTION, pageNumber)
    } else {
      getPhotos(LOAD_MORE_PHOTOS, pageNumber)
    }
  }, [pageNumber])

  useEffect(() => {
    return () => {
      dispatch({ type: CLEAR_CURRENT_COLLECTION, payload: [] })
    }
  }, [])

  const handleSortChange = useCallback((sort: ISortOption | undefined) => {
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

  const lastPhotoRef = useCallback((node) => {
    if (observer.current) {
      observer.current.disconnect()
    }
    observer.current = new IntersectionObserver(
      (entries) => {
        if (!initialRender.current && entries[0].isIntersecting) {
          setPageNumber((pageNum: number) => pageNum + 1)
        }

        initialRender.current = false
      },
      { threshold: 0.25 }
    )
    if (node) {
      observer.current.observe(node)
    }
  }, [])

  const renderPhotos = currentCollection ? (
    [...currentCollection.photos!].sort(sortType(activeSort)).map((photo, i, arr) => {
      if (arr.length === i + 1) {
        return (
          <CollectionPhoto lastPhotoRef={lastPhotoRef} key={photo.id} handleModalView={handleModalView} {...photo} />
        )
      } else {
        return <CollectionPhoto key={photo.id} handleModalView={handleModalView} {...photo} />
      }
    })
  ) : (
    <Loading>Loading...</Loading>
  )

  const collectionTitle = currentCollection ? currentCollection.title : 'Loading...'

  return (
    <>
      <Sort title={collectionTitle} activeSort={activeSort} handleSortChange={handleSortChange} />
      <Wrapper>{renderPhotos}</Wrapper>
      {isModalOn && <PhotoModal selecetdPhotoId={selecetdPhotoId} handleModalView={handleModalView} />}
    </>
  )
}

export default Collection
