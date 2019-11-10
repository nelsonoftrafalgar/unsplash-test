import { IPrevievPhoto } from '../utils/model'
import React from 'react'
import { breakpoint } from '../styles/breakpoints'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
  Width: 95%;
  background: #fff;
  padding: 10px 10px 0 10px;
  border-radius: 5px;
  box-shadow: 0px 4px 12px 0px rgba(198, 198, 198, 0.82);
  margin: 15px;
  ${breakpoint('500', `
    width: 45%;
  `)}
  ${breakpoint('800', `
    width: 30%;
  `)}
  ${breakpoint('1100', `
    width: 13%;
  `)}
`

const Photo = styled.img`
  width: 100%;
  margin-bottom: 10px;
  border-radius: 5px;
`

const Overlay = styled.button`
  background: #fff;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 5px;
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
  font-size: 25px;
  font-family: sans-serif;
  ${breakpoint('1100', `
    margin: 5px 0;
    font-size: 19px;
  `)}
`

const Icon = styled.span`
  margin-right: 10px;
`

interface ICollectionPhotoProps extends IPrevievPhoto {
  handleModalView: (toggle: boolean) => () => void
} 

const CollectionPhoto: React.FC<ICollectionPhotoProps> = ({handleModalView, src, alt, likes}) => {
  return (
    <Wrapper>
      <Overlay onClick={handleModalView(true)}>
        <Stat>
          <Icon>&#9733;</Icon>
          {likes}
        </Stat>
      </Overlay>
      <Photo src={src} alt={alt}/>
    </Wrapper>
  )
}

export default CollectionPhoto
