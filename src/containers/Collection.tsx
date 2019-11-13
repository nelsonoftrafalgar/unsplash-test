import { CLEAR_CURRENT_COLLECTION, CLEAR_SINGLE_PHOTO, GET_CURRENT_COLLECTION, LOAD_MORE_PHOTOS } from '../utils/actions'
import { ICollectionProps, ISortOption } from '../utils/model'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'

import CollectionPhoto from '../components/CollectionPhoto'
import { Context } from '../utils/context'
import PhotoModal from '../components/PhotoModal'
import Sort from '../components/Sort'
import { breakpoint } from '../styles/breakpoints'
import { getCollections } from '../helpers/getCollections'
import { sortType } from '../helpers/sortType'
import styled from 'styled-components'
import { variables } from '../styles/variables'

const {
  fontColor,
  bgColor,
  breakpointSmall,
  fontSize3,
  fontFamily
} = variables

const Wrapper = styled.section`
  width: 100%;
  min-height: 100vh;
  background: ${bgColor};
  display: flex;
  justify-content: space-evenly;
  padding: 20px 0;
  flex-direction: column;
  align-items: center;
  ${breakpoint(breakpointSmall, `
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: center;
  `)}
`

const Loading = styled.span`
  color: ${fontColor};
  font-size: ${fontSize3};
  font-family: ${fontFamily};
`

const Collection: React.FC<ICollectionProps> = ({id, name}) => {
  const {currentCollection, dispatch} = useContext(Context)
  const [isModalOn, setIsModalOn] = useState<boolean>(false)
  const [activeSort, setActiveSort] = useState<ISortOption | undefined>(undefined)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [selecetdPhotoId, setSelecetdPhotoId] = useState<string>('')
  const observer = useRef<IntersectionObserver>()
  const initialRender = useRef(true)

  const collectionParams = [{id, name}]

  useEffect(() => {
    getCollections(collectionParams, dispatch, GET_CURRENT_COLLECTION, pageNumber)

    return () => {
      dispatch({type: CLEAR_CURRENT_COLLECTION, payload: []})
    }
  }, [])

  useEffect(() => {
    if (!initialRender.current) {
      getCollections(collectionParams, dispatch, LOAD_MORE_PHOTOS, pageNumber)
    }
  }, [pageNumber])

  const handleSortChange = (sort: ISortOption | undefined) => {
    setActiveSort(sort)
  }

  const handleModalView = (toggle: boolean, photoId?: string) => () => {
    document.body.style.overflow = toggle ? 'hidden' : 'visible'
    setIsModalOn(toggle)
    dispatch({type: CLEAR_SINGLE_PHOTO, payload: undefined})
    if (photoId) {
      setSelecetdPhotoId(photoId)
    }
  }

  const lastPhotoRef = useCallback((node) => {
    if (observer.current) { observer.current.disconnect() }
    observer.current = new IntersectionObserver((entries) => {
      if (!initialRender.current && entries[0].isIntersecting) {
        setPageNumber((pageNum) => pageNum + 1)
      }

      initialRender.current = false
    }, {threshold: 0.25})
    if (node) { observer.current.observe(node) }
  }, [])

  const renderPhotos = currentCollection ? [...currentCollection.photos]
    .sort(sortType(activeSort))
    .map((photo, i, arr) => {
      if (arr.length === i + 1) {
        return (
          <CollectionPhoto
            lastPhotoRef={lastPhotoRef}
            key={photo.id}
            handleModalView={handleModalView}
            {...photo}
          />
        )
      } else {
        return (
          <CollectionPhoto
            key={photo.id}
            handleModalView={handleModalView}
            {...photo}
          />
        )
      }
  }) : <Loading>Loading...</Loading>

  const collectionTitle = currentCollection ? currentCollection.title : 'Loading...'

  return (
    <>
      <Sort
        title={collectionTitle}
        activeSort={activeSort}
        handleSortChange={handleSortChange}
      />
      <Wrapper>
        {renderPhotos}
      </Wrapper>
      {isModalOn && (
        <PhotoModal
          selecetdPhotoId={selecetdPhotoId}
          handleModalView={handleModalView}
        />
      )}
    </>
  )
}

export default Collection
