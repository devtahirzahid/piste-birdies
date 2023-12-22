import { gql } from '@apollo/client'
import { shipmentData } from '../utils'

const fetchShipments = gql`
  query fetchShipments($after: String, $first: Int) {
    fetchShipments(first: $first, after: $after) {
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
export default fetchShipments
