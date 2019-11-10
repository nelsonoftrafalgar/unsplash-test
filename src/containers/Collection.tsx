import { ICollectionPreview, ICollectionProps, ISortOption } from '../utils/model'
import React, { useContext, useState } from 'react'

import CollectionPhoto from '../components/CollectionPhoto'
import { Context } from '../utils/context'
import PhotoModal from '../components/PhotoModal'
import Sort from '../components/Sort'
import { breakpoint } from '../styles/breakpoints'
import { sortType } from '../helpers/sortType'
import styled from 'styled-components'

const Wrapper = styled.section`
  width: 100%;
  min-height: 100vh;
  background: #f5f6f8;
  display: flex;
  justify-content: space-evenly;
  padding: 20px 0;
  flex-direction: column;
  align-items: center;
  ${breakpoint('500', `
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: center;
  `)}
`

const Collection: React.FC<ICollectionProps> = ({id}) => {
  const {collections} = useContext(Context)
  const [isModalOn, setIsModalOn] = useState<boolean>(false)
  const [activeSort, setActiveSort] = useState<ISortOption | null>(null)

  const handleSortChange = (sort: ISortOption | null) => {
    setActiveSort(sort)
  }

  const currentCollection = collections.find((collection) => collection.id === id) || {} as ICollectionPreview

  const handleModalView = (toggle: boolean) => () => {
    document.body.style.overflow = toggle ? 'hidden' : 'visible'
    setIsModalOn(toggle)
  }

  const renderPhotos = [...currentCollection.photos].sort(sortType(activeSort)).map((photo) => {
    return <CollectionPhoto key={photo.id} handleModalView={handleModalView} {...photo}/>
  })

  return (
    <>
      <Sort 
        title={currentCollection.title} 
        activeSort={activeSort} 
        handleSortChange={handleSortChange}
      />
      <Wrapper>
        {renderPhotos}
      </Wrapper>
      {isModalOn && <PhotoModal handleModalView={handleModalView}/>}
    </>
  )
}

export default Collection
