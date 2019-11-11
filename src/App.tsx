import * as React from 'react'

import {
  Route,
  BrowserRouter as Router,
  Switch
} from 'react-router-dom'

import { COLLECTION_PARAMS } from './utils/data'
import Collection from './containers/Collection'
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

const App = () => {
  const renderRoutes = COLLECTION_PARAMS.map((collection) => {
    const {id} = collection
    return (
      <Route
        key={id}
        path={'/' + id.toString()}
        render={() => <Collection {...collection}/>}
      />
    )
  })
  
  return (
    <>
      <StyleReset/>
      <Store>
        <Router>
          <Switch>
            <Route
              exact
              path='/'
              component={CollectionList}
            />
            {renderRoutes}
          </Switch>
        </Router>
      </Store>
    </>
  )
}

export default App