import { ICollectionPreview } from '../utils/model'
import {Link} from 'react-router-dom'
import React from 'react'
import { breakpoint } from '../styles/breakpoints'
import styled from 'styled-components'
import { variables } from '../styles/variables'

const Wrapper = styled.div`
  Width: 95%;
  background: ${variables.itemsBgColor};
  padding: 10px 10px 0 10px;
  border-radius: ${variables.borderRadius};
  box-shadow: ${variables.boxShadow};
  margin-bottom: 20px;
  ${breakpoint(variables.breakpointSmall, `
    width: 45%;
  `)}
  ${breakpoint(variables.breakpointMedium, `
    width: 30%;
  `)}
  ${breakpoint(variables.breakpointLarge, `
    width: 13%;
  `)}
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
  border-radius: ${variables.borderRadius};
`
const Title = styled.h2`
  text-align: center;
  font-size: ${variables.fontSize2};
  font-family: ${variables.fontFamily};
  margin-bottom: 10px;
  font-weight: ${variables.fontWeightNormal};
`

const CollectionPreview: React.FC<ICollectionPreview> = ({title, photos, id}) => {

  const renderPhotos = photos.map((photo) => {
    const {src, alt} = photo

    return <Photo key={photo.id} src={src} alt={alt}/>
  })

  return (
    <Wrapper>
      <Link to={id.toString()}>
        <Title>{title}</Title>
        <Photos>
          {renderPhotos}
        </Photos>
      </Link>
    </Wrapper>
  )
}

export default CollectionPreview
