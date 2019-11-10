import { ICollectionPreview } from '../utils/model'
import {Link} from 'react-router-dom'
import React from 'react'
import { breakpoint } from '../styles/breakpoints'
import styled from 'styled-components'

const Wrapper = styled.div`
  Width: 95%;
  background: #fff;
  padding: 10px 10px 0 10px;
  border-radius: 5px;
  box-shadow: 0px 4px 12px 0px rgba(198, 198, 198, 0.82);
  margin-bottom: 20px;
  ${breakpoint('500', `
    width: 45%;
  `)}
  ${breakpoint('800', `
    width: 30%;
  `)}
  ${breakpoint('1100', `
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
  border-radius: 5px;
`
const Title = styled.h2`
  text-align: center;
  font-size: 16px;
  font-family: sans-serif;
  margin-bottom: 10px;
  font-weight: 400;
`

const CollectionPreview: React.FC<ICollectionPreview> = ({title, photos, id}) => {
  
  const renderPhotos = photos.map(photo => {
    const {id, src, alt} = photo
    return <Photo key={id} src={src} alt={alt}/>
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