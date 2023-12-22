import { gql } from '@apollo/client'
import { shipmentData } from '../utils'

const fetchUserShipmentHistory = gql`
  query fetchUserShipmentHistory(
    $authenticationToken: String!
    $after: String
    $first: Int
  ) {
    fetchUserShipmentHistory(
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
          statusUpdatedAt
          shipment {
            ${shipmentData}
          }
        }
      }
    }
  }
`
export default fetchUserShipmentHistory
