import * as React from 'react'

import { createGlobalStyle } from 'styled-components'
import styled from 'styled-components'

const StyleReset = createGlobalStyle`
  * {
  margin: 0;
  padding: 0;
  border: 0;
  box-sizing: border-box;
}`

const Title = styled.h1`
  color: red;
`

class App extends React.Component {
  render() {
    return (
      <>
        <StyleReset/>
        <Title>Dupa</Title>
      </>
    )
  }
}

export default App