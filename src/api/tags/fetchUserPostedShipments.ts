import { gql } from '@apollo/client'
import { shipmentData } from '../utils'

const fetchUserPostedShipments = gql`
  query fetchUserPostedShipments(
    $authenticationToken: String!
    $after: String
    $first: Int
  ) {
    fetchUserPostedShipments(
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
          ${shipmentData}
        }
      }
    }
  }
`
export default fetchUserPostedShipments
