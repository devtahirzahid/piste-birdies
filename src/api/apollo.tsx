/* eslint-disable react/jsx-props-no-spreading, no-console */

import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-boost'
import { HttpLink } from 'apollo-link-http'
import fetch from 'isomorphic-fetch'

//@ts-ignore
let apolloClient

const isBrowser = typeof window !== 'undefined'

//@ts-ignore
const createApolloClient = initialState => {
  return new ApolloClient({
    ssrMode: false,
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_APOLLO_GATEWAY_URL, // Server URL (must be absolute)
      // credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
      fetch
    }),
    cache: new InMemoryCache().restore(initialState)
  })
}

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 * @param  {Object} initialState
 */
//@ts-ignore
function initApolloClient(initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)

  if (!isBrowser) {
    return createApolloClient(initialState)
  }

  // Reuse client on the client-side
  //@ts-ignore
  if (!apolloClient) {
    apolloClient = createApolloClient(initialState)
  }

  return apolloClient
}

/**
 * Creates and provides the apolloContext
 * to a next.js PageTree. Use it by wrapping
 * your PageComponent via HOC pattern.
 * @param {Function|Class} PageComponent
 * @param {Object} [config]
 */
//@ts-ignore
export function withApollo(PageComponent) {
  // eslint-disable-next-line
  //@ts-ignore
  const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
    const client = apolloClient || initApolloClient(apolloState)

    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    )
  }

  //@ts-ignore
  if (PageComponent.getInitialProps) {
    //@ts-ignore
    WithApollo.getInitialProps = async ctx => {
      // Initialize ApolloClient, add it to the ctx object so
      // we can use it in `PageComponent.getInitialProp`.
      // eslint-disable-next-line
      const apolloClient = (ctx.apolloClient = initApolloClient({}))

      // Run wrapped getInitialProps methods
      const pageProps = await PageComponent.getInitialProps(ctx)

      // Only on the server:
      if (!isBrowser) {
        // When redirecting, the response is finished.
        // No point in continuing to render
        if (ctx.res && ctx.res.finished) {
          return pageProps
        }
      }

      // Extract query data from the Apollo store
      const apolloState = apolloClient?.cache.extract()

      return {
        ...pageProps,
        apolloState
      }
    }
  }

  return WithApollo
}

export default withApollo
