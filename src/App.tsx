import * as React from 'react'

import CollectionList from './containers/CollectionList'
import Store from './containers/Store'
import { createGlobalStyle } from 'styled-components'

const StyleReset = createGlobalStyle`
  * {
  margin: 0;
  padding: 0;
  border: 0;
  box-sizing: border-box;
}`

class App extends React.Component {
  render() {
    return (
      <>
        <StyleReset/>
        <Store>
          <CollectionList/>
        </Store>
      </>
    )
  }
}

export default App