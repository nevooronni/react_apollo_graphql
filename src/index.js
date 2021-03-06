import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'
import { setContext } from 'apollo-link-context'
import gql from 'graphql-tag'

import App from './App'

const httpLink = new HttpLink({ uri: 'https://api.github.com/graphql' })

const authLink = setContext((_, { headers }) => {
  //This token would be kept private an an environment variable in production code
  const token='fac00be30e39fac71a593a2a35275f8fdfd1e94c'

  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`
    }
  }
})

const link = authLink.concat(httpLink)

//apollo client object instance
const client = new ApolloClient({
  //add a Apollo Link to our Apollo Client instance to use the Github GraphQL endpoint URI
  link: link,
  //tell Apollo Client which caching strategy to use
  cache: new InMemoryCache()
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)

const POPULAR_REPOSITORIES_LIST = gql`
{
  search(query: "stars:>50000", type: REPOSITORY, first: 10) {
    repositoryCount 
    edges {
      node {
        ... on Repository {
          name 
          owner {
            login 
          }
          stargazers {
            totalCount
          }
        }
      }
    }      
  }
}
`

client.query({ query: POPULAR_REPOSITORIES_LIST }).then(console.log)


