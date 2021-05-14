import { QueryClient, QueryClientProvider } from 'react-query'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import { COLLECTION_PARAMS } from './utils/data'
import Collection from './containers/Collection'
import CollectionList from './containers/CollectionList'
import Store from './containers/Store'
import { createGlobalStyle } from 'styled-components'

const queryClient = new QueryClient()

const StyleReset = createGlobalStyle`
  * {
  margin: 0;
  padding: 0;
  border: 0;
  box-sizing: border-box;
}`

const App = () => {
  return (
    <>
      <StyleReset />
      <Store>
        <QueryClientProvider client={queryClient}>
          <Router>
            <Switch>
              <Route exact={true} path="/" component={CollectionList} />
              {COLLECTION_PARAMS.map(({ id, slug }) => (
                <Route key={id} path={`/${slug}`} render={() => <Collection id={id} />} />
              ))}
            </Switch>
          </Router>
        </QueryClientProvider>
      </Store>
    </>
  )
}

export default App
