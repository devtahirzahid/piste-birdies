import { gql } from '@apollo/client'

const fetchMessages = gql`
  query fetchMessages(
    $shipmentId: ID!
    $authenticationToken: String!
    $after: String
  ) {
    fetchMessages(
      shipmentId: $shipmentId
      authenticationToken: $authenticationToken
      after: $after
    ) {
      pageInfo {
        endCursor
      }
      edges {
        cursor
        node {
          id
          message
          createdAt
          sender {
            id
            email
            firstName
            lastName
            avatar
          }
        }
      }
    }
  }
`
export default fetchMessages
