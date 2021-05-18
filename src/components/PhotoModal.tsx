import { breakpoint } from '../styles/breakpoints'
import styled from 'styled-components'
import { usePhoto } from '../unsplash/usePhoto'
import { variables } from '../styles/variables'

const {
  itemsBgColor,
  borderRadius,
  lightFontColor,
  fontColor,
  breakpointSmall,
  breakpointMedium,
  breakpointLarge,
  fontSize1,
  fontSize2,
  fontSize3,
  fontFamily,
} = variables

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
  max-height: 90vh;
  height: 100%;
  background: ${itemsBgColor};
  border-radius: ${borderRadius};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
`

const Image = styled.img`
  width: auto;
  height: auto;
  max-width: 80%;
  ${breakpoint(
    breakpointSmall,
    `
    max-height: 60%;
  `
  )}
  ${breakpoint(
    breakpointLarge,
    `
    max-height: 90%;
  `
  )}
`

const CloseButton = styled.button`
  background: transparent;
  color: ${fontColor};
  position: absolute;
  top: 0;
  right: 2%;
  font-size: ${fontSize2};
  cursor: pointer;
  ${breakpoint(
    breakpointMedium,
    `
    top: 10px;
    right: 15px;
    font-size: ${fontSize3};
  `
  )}
`

const Loading = styled.span`
  color: ${lightFontColor};
  font-size: ${fontSize3};
  font-family: ${fontFamily};
`

const Stat = styled.p`
  margin: 10px;
  font-size: ${fontSize2};
  font-family: ${fontFamily};
`

const Text = styled.span`
  margin-right: 10px;
  font-size: ${fontSize1};
`

const Stats = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 10px 10px 0 10px;
  flex-direction: column;
  ${breakpoint(
    breakpointSmall,
    `
    justify-content: space-evenly;
    flex-direction: row;
  `
  )}
`

export interface IProps {
  handleModalView: (toggle: boolean, id?: string) => () => void
  selecetdPhotoId: string
}

const PhotoModal: React.FC<IProps> = ({ handleModalView, selecetdPhotoId }) => {
  const singlePhoto = usePhoto(selecetdPhotoId)

  if (!singlePhoto) {
    return (
      <Wrapper>
        <Loading>Loading...</Loading>
      </Wrapper>
    )
  }

  const { url, alt, views, downloads, likes, author, createdAt } = singlePhoto

  return (
    <Wrapper>
      <PhotoContainer data-cy="single-photo-modal">
        <Image data-cy="modal-photo" src={url} alt={alt} />
        <CloseButton data-cy="single-photo-modal-close" onClick={handleModalView(false)}>
          &#10005;
        </CloseButton>
        <Stats data-cy="photo-description">
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
            {createdAt.substr(0, 10)}
          </Stat>
        </Stats>
      </PhotoContainer>
    </Wrapper>
  )
}

export default PhotoModal
