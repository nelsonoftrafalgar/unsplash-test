import CollectionPreview from '../components/CollectionPreview'
import { breakpoint } from '../styles/breakpoints'
import styled from 'styled-components'
import { useCollectionList } from '../unsplash/useCollectionList'
import { variables } from '../styles/variables'

const { bgColor, breakpointSmall } = variables

const Wrapper = styled.div`
  width: 100%;
  background: ${bgColor};
  display: flex;
  justify-content: space-evenly;
  padding: 20px 0;
  flex-direction: column;
  align-items: center;
  ${breakpoint(
    breakpointSmall,
    `
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
  `
  )}
`

const CollectionList = () => {
  const collections = useCollectionList()

  return (
    <Wrapper>
      {collections?.map((collection) => (
        <CollectionPreview key={collection.id} {...collection} />
      ))}
    </Wrapper>
  )
}

export default CollectionList
