import {ISortProps} from '../utils/model'
import React from 'react'
import { SELECT_STYLES } from '../styles/sort'
import Select from 'react-select'
import { breakpoint } from '../styles/breakpoints'
import { sortOptions } from '../utils/data'
import styled from 'styled-components'
import { variables } from '../styles/variables'

const {
  bgColor,
  breakpointMedium,
  fontSize3,
  fontFamily
} = variables

const Wrapper = styled.div`
  width: 100%;
  background: ${bgColor};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${breakpoint(breakpointMedium, `
    flex-direction: row;
  `)}
`

const Title = styled.h1`
  font-family: ${fontFamily};
  margin: 25px 25px 0;
  font-size: ${fontSize3};
`

const Sort: React.FC<ISortProps> = ({activeSort, handleSortChange, title}) => {
  return (
    <Wrapper data-cy='single-collection-sort-select'>
      <Title data-cy='single-collection-title'>{title}</Title>
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
