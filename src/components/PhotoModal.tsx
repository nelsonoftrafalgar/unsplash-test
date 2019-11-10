import React from 'react'
import styled from 'styled-components'

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
  width: 200px;
  height: 200px;
  background: #fff;
  border-radius: 5px;
`

interface IPhotoModalProps {
  handleModalView: (toggle: boolean) => () => void
} 

const PhotoModal: React.FC<IPhotoModalProps> = ({handleModalView}) => {
  return (
    <Wrapper>
      <PhotoContainer/>
      <button onClick={handleModalView(false)}>Close</button>
    </Wrapper>
  )
}

export default PhotoModal
