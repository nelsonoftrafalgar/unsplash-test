import {ISortProps} from '../utils/model'
import React from 'react'
import { SELECT_STYLES } from '../styles/sort'
import Select from 'react-select'
import { breakpoint } from '../styles/breakpoints'
import { sortOptions } from '../utils/data'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
  background: #f5f6f8;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${breakpoint('800', `
    flex-direction: row;
  `)}
`

const Title = styled.h1`
  font-family: sans-serif;
  margin: 25px 25px 0;  
  font-size: 20px;
`

const Sort: React.FC<ISortProps> = ({activeSort, handleSortChange, title}) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <Select 
        options={sortOptions}
        value={activeSort}
        onChange={handleSortChange as any}  
        placeholder='Sort by...'
        isClearable={true}
        styles={SELECT_STYLES}
      />
    </Wrapper>
  )
}

export default Sort
