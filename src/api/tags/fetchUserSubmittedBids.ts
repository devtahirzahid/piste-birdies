import { gql } from '@apollo/client'
import { shipmentData } from '../utils'

const fetchUserSubmittedBids = gql`
  query fetchUserSubmittedBids(
    $authenticationToken: String!
    $after: String
    $first: Int
  ) {
    fetchUserSubmittedBids(
      authenticationToken: $authenticationToken
      first: $first
      after: $after
    ) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          status
          updatedAt
          shipment {
            ${shipmentData}
          }
        }
      }
    }
  }
`
export default fetchUserSubmittedBids
