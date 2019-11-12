import { ICollectionPhotoProps } from '../utils/model'
import React from 'react'
import { breakpoint } from '../styles/breakpoints'
import styled from 'styled-components'
import { variables } from '../styles/variables'

const Wrapper = styled.div`
  position: relative;
  Width: 95%;
  background: ${variables.itemsBgColor};
  padding: 10px 10px 0 10px;
  border-radius: ${variables.borderRadius};
  box-shadow: ${variables.boxShadow};
  margin: 15px;
  ${breakpoint(variables.breakpointSmall, `
    width: 45%;
  `)}
  ${breakpoint(variables.breakpointMedium, `
    width: 30%;
  `)}
  ${breakpoint(variables.breakpointLarge, `
    width: 13%;
  `)}
`

const Photo = styled.img`
  width: 100%;
  margin-bottom: 10px;
  border-radius: ${variables.borderRadius};
`

const Overlay = styled.button`
  background: ${variables.itemsBgColor};
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: ${variables.borderRadius};
  opacity: 0;
  transition: opacity .3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;

  &:hover {
    opacity: .7;
  }
`

const Stat = styled.p`
  margin: 10px 0;
  font-size: ${variables.fontSize4};
  font-family: ${variables.fontFamily};
  ${breakpoint(variables.breakpointLarge, `
    margin: 5px 0;
    font-size: ${variables.fontSize3};
  `)}
`

const Icon = styled.span`
  margin-right: 10px;
`

const CollectionPhoto: React.FC<ICollectionPhotoProps> = ({
  handleModalView,
  src,
  alt,
  likes,
  lastPhotoRef,
  id,
  createdAt
}) => {

  return (
    <Wrapper ref={lastPhotoRef}>
      <Overlay onClick={handleModalView(true, id)}>
        <Stat>
          <Icon>&#9733;</Icon>
          {likes}
        </Stat>
        <Stat>
          {createdAt.substring(0, 10)}
        </Stat>
      </Overlay>
      <Photo src={src} alt={alt}/>
    </Wrapper>
  )
}

export default CollectionPhoto
