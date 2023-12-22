import { gql } from '@apollo/client'
import { shipmentData } from '../utils'

const fetchUserActiveShipments = gql`
  query fetchUserActiveShipments(
    $authenticationToken: String!
    $after: String
    $first: Int
  ) {
    fetchUserActiveShipments(
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
export default fetchUserActiveShipments
