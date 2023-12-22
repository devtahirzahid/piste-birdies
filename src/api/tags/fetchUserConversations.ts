// fetchUserConversations(
// authenticationToken: String!
// after: String
// before: String
// first: Int
// last: Int
// ): UserConversationsConnection

import { gql } from '@apollo/client'

const fetchUserConversations = gql`
  query fetchUserConversations($authenticationToken: String!, $after: String) {
    fetchUserConversations(
      authenticationToken: $authenticationToken
      after: $after
    ) {
      pageInfo {
        endCursor
      }
      edges {
        cursor
        node {
          shipment {
            id
            conversationActive
            isOwner
            isRunner
            owner {
              id
              firstName
              lastName
              avatar
            }
            runner {
              id
              firstName
              lastName
              avatar
            }
            addresses {
              city
              addressType
            }
          }
        }
      }
    }
  }
`
export default fetchUserConversations
