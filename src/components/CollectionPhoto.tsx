import { ICollectionPhotoProps } from '../utils/model'
import React from 'react'
import { breakpoint } from '../styles/breakpoints'
import styled from 'styled-components'
import { variables } from '../styles/variables'

const {
  itemsBgColor,
  borderRadius,
  boxShadow,
  breakpointLarge,
  breakpointMedium,
  breakpointSmall,
  fontSize3,
  fontSize4,
  fontFamily,
} = variables

const Wrapper = styled.div`
  position: relative;
  width: 95%;
  background: ${itemsBgColor};
  padding: 10px 10px 0 10px;
  border-radius: ${borderRadius};
  box-shadow: ${boxShadow};
  margin: 15px;
  ${breakpoint(
    breakpointSmall,
    `
    width: 45%;
  `
  )}
  ${breakpoint(
    breakpointMedium,
    `
    width: 30%;
  `
  )}
  ${breakpoint(
    breakpointLarge,
    `
    width: 13%;
  `
  )}
`

const Photo = styled.img`
  width: 100%;
  margin-bottom: 10px;
  border-radius: ${borderRadius};
`

const Overlay = styled.button`
  background: ${itemsBgColor};
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: ${borderRadius};
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`

const Stat = styled.p`
  margin: 10px 0;
  font-size: ${fontSize4};
  font-family: ${fontFamily};
  ${breakpoint(
    breakpointLarge,
    `
    margin: 5px 0;
    font-size: ${fontSize3};
  `
  )}
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
  createdAt,
}) => {
  return (
    <Wrapper data-cy="single-collection-photo-wrapper" ref={lastPhotoRef}>
      <Overlay data-cy="single-collection-photo-overlay" onClick={handleModalView(true, id)}>
        <Stat>
          <Icon>&#9733;</Icon>
          {likes}
        </Stat>
        <Stat>{createdAt.substring(0, 10)}</Stat>
      </Overlay>
      <Photo data-cy="single-collection-photo" src={src} alt={alt} />
    </Wrapper>
  )
}

export default React.memo(CollectionPhoto)
