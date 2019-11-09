import React, { useContext } from 'react'

import CollectionPreview from './CollectionPreview'
import { Context } from '../utils/context'
import { breakpoint } from '../styles/breakpoints'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
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
  `)}
`

const CollectionList = () => {
  const {collections} = useContext(Context)

  const renderCollections = collections.map((collection) => {
    return <CollectionPreview key={collection.id} {...collection} /> 
  })

  return (
    <Wrapper>
      {renderCollections}
    </Wrapper>
  )
}

export default CollectionList
