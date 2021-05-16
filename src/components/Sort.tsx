import { ISortOption } from '../utils/model'
import React from 'react'
import { SELECT_STYLES } from '../styles/sort'
import { SORT_OPTIONS } from '../utils/constants'
import Select from 'react-select'
import { breakpoint } from '../styles/breakpoints'
import styled from 'styled-components'
import { variables } from '../styles/variables'

const { bgColor, breakpointMedium, fontSize3, fontFamily } = variables

const Wrapper = styled.div`
  width: 100%;
  background: ${bgColor};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${breakpoint(
    breakpointMedium,
    `
    flex-direction: row;
  `
  )}
`

const Title = styled.h1`
  font-family: ${fontFamily};
  margin: 25px 25px 0;
  font-size: ${fontSize3};
`

interface IProps {
  title?: string
  activeSort: ISortOption | null
  handleSortChange: (sort: ISortOption | null) => void
}

const Sort: React.FC<IProps> = ({ activeSort, handleSortChange, title }) => {
  return (
    <Wrapper data-cy="single-collection-sort-select">
      <Title data-cy="single-collection-title">{title}</Title>
      <Select
        options={SORT_OPTIONS}
        value={activeSort}
        onChange={handleSortChange}
        placeholder="Sort by..."
        isClearable={true}
        styles={SELECT_STYLES}
      />
    </Wrapper>
  )
}

export default React.memo(Sort)
