import { gql } from '@apollo/client'

const fetchNotifications = gql`
  query fetchNotifications(
    $authenticationToken: String!
    $before: String
    $after: String
    $first: Int
    $last: Int
  ) {
    fetchNotifications(
      authenticationToken: $authenticationToken
      before: $before
      after: $after
      first: $first
      last: $last
    ) {
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          id
          message
          title
          notifiable
          readAt
          createdAt
          variant
          shipment {
            id
          }
        }
      }
    }
  }
`
export default fetchNotifications
