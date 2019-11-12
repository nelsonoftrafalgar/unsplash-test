import React, { useContext } from 'react'

import { Context } from '../utils/context'
import { breakpoint } from '../styles/breakpoints'
import styled from 'styled-components'
import { useGetSinglePhoto } from '../helpers/useGetSinglePhoto'
import { variables } from '../styles/variables'

const Wrapper = styled.div`
  position: fixed;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.75);
`

const PhotoContainer = styled.div`
  position: relative;
  width: 80%;
  height: 90vh;
  background: ${variables.itemsBgColor};
  border-radius: ${variables.borderRadius};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
`

const Image = styled.img`
  width: 60%;
  ${breakpoint(variables.breakpointSmall, `
    height: 30vw;
    width: unset;
  `)}
  ${breakpoint(variables.breakpointMedium, `
    height: 40vw;
  `)}
`

const CloseButton = styled.button`
  background: transparent;
  color: ${variables.fontColor};
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: ${variables.fontSize3};
  cursor: pointer;
`

const Loading = styled.span`
  color: ${variables.lightFontColor};
  font-size: ${variables.fontSize3};
  font-family: ${variables.fontFamily};
`

const Stat = styled.p`
  margin: 10px;
  font-size: ${variables.fontSize2};
  font-family: ${variables.fontFamily};
`

const Text = styled.span`
  margin-right: 10px;
  font-size: ${variables.fontSize1};
`

const Stats = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 0 10px;
  flex-direction: column;
  ${breakpoint(variables.breakpointSmall, `
    justify-content: space-evenly;
    flex-direction: row;
  `)}
`

const FacebookButton = styled.a`
  background: ${variables.fontColor};
  color: ${variables.lightFontColor};
  position: absolute;
  top: 10px;
  left: 15px;
  font-size: ${variables.fontSize4};
  cursor: pointer;
  font-weight: ${variables.fontWeightBold};
  padding: 1px 10px;
  border-radius: ${variables.borderRadius};
  font-family: ${variables.fontFamily};
  text-decoration: none;
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
        <FacebookButton
          href='https://www.facebook.com/sharer/sharer.php?u=example.org'
          target='_blank'
          rel='noopener'
        >
          f
        </FacebookButton>
        <Stats>
          <Stat>
            <Text>Likes:</Text>
            {likes}
          </Stat>
          <Stat>
            <Text>Author:</Text>
            {author}
          </Stat>
          <Stat>
            <Text>Views:</Text>
            {views}
          </Stat>
          <Stat>
            <Text>Downloads</Text>
            {downloads}
          </Stat>
          <Stat>
            <Text>Added:</Text>
            {createdAt.substr(0 , 10)}
          </Stat>
        </Stats>
      </PhotoContainer>
    </Wrapper>
  )
}

export default PhotoModal
