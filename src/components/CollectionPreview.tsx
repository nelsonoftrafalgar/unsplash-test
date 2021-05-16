import { Link } from 'react-router-dom'
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
  fontSize2,
  fontWeightNormal,
  fontFamily,
} = variables

const Wrapper = styled.div`
  width: 95%;
  background: ${itemsBgColor};
  padding: 10px 10px 0 10px;
  border-radius: ${borderRadius};
  box-shadow: ${boxShadow};
  margin-bottom: 20px;
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
  a {
    color: inherit;
    text-decoration: none;
  }
`
const Photos = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
`
const Photo = styled.img`
  width: 100%;
  margin-bottom: 10px;
  border-radius: ${borderRadius};
`
const Title = styled.h2`
  text-align: center;
  font-size: ${fontSize2};
  font-family: ${fontFamily};
  margin-bottom: 10px;
  font-weight: ${fontWeightNormal};
`

interface IProps {
  id: number
  title: string
  slug: string
  photos?: Array<{
    id: string
    alt: string
    src: string
    likes: number
    createdAt: string
  }>
}

const CollectionPreview: React.FC<IProps> = ({ title, photos, slug }) => {
  return (
    <Wrapper data-cy="collection-preview-wrapper">
      <Link to={slug}>
        <Title data-cy="collection-preview-title">{title}</Title>
        <Photos>
          {photos?.map(({ src, alt, id }) => (
            <Photo data-cy="collection-preview-photo" key={id} src={src} alt={alt} />
          ))}
        </Photos>
      </Link>
    </Wrapper>
  )
}

export default CollectionPreview
