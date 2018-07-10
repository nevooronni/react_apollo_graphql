import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'

import App from './App'

//apollo client object instance
const client = new ApolloClient({
  //add a Apollo Link to our Apollo Client instance to use the Github GraphQL endpoint URI
  link: new HttpLink({ uri: 'https://api.github.com/graphql' }),
  //tell Apollo Client which caching strategy to use
  cache: new InMemoryCache()
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)



