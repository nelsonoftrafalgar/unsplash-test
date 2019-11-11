import React, { useContext } from 'react'

import { Context } from '../utils/context'
import { breakpoint } from '../styles/breakpoints'
import styled from 'styled-components'
import { useGetSinglePhoto } from '../helpers/useGetSinglePhoto'

const Wrapper = styled.div`
  position: fixed;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.75);
`

const PhotoContainer = styled.div`
  position: relative;
  width: 80%;
  height: 90vh;
  background: #fff;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`

const Image = styled.img`
  height: 70%;
`

const CloseButton = styled.button`
  background:
  transparent;
  color: #000;
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 20px;
  cursor: pointer;
`

const Loading = styled.span`
  color: #fff;
  font-size: 20px;
  font-family: sans-serif;
`

const Stat = styled.p`
  margin: 10px 0;
  font-size: 16px;
  font-family: sans-serif;
  /* ${breakpoint('1100', `
    margin: 5px 0;
    font-size: 19px;
  `)} */
`

const Icon = styled.span`
  margin-right: 10px;
  font-size: 13px;
`

const Stats = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`


interface IPhotoModalProps {
  handleModalView: (toggle: boolean, id: string) => () => void
  selecetdPhotoId: string
} 

const PhotoModal: React.FC<IPhotoModalProps> = ({handleModalView, selecetdPhotoId}) => {
  const {dispatch, singlePhoto} = useContext(Context)

  useGetSinglePhoto(dispatch, selecetdPhotoId)
  
  if (!singlePhoto) {
    return (
      <Wrapper>
        <Loading>Loading...</Loading>
      </Wrapper>
    )
  }
  
  const {url, alt, views, downloads, likes, author, createdAt} = singlePhoto

  return (
    <Wrapper>
      <PhotoContainer>
        <Image src={url} alt={alt}/>
        <CloseButton onClick={handleModalView(false, '')}>&#10005;</CloseButton>
        <Stats>
          <Stat>
            <Icon>Likes:</Icon>
            {likes}
          </Stat>
          <Stat>
            <Icon>Author:</Icon>
            {author}
          </Stat>
          <Stat>
            <Icon>Views:</Icon>
            {views}
          </Stat>
          <Stat>
            <Icon>Downloads</Icon>
            {downloads}
          </Stat>
          <Stat>
            <Icon>Added:</Icon>
            {createdAt.substr(0 ,10)}
          </Stat>
        </Stats>
      </PhotoContainer>
    </Wrapper>
  )
}

export default PhotoModal
