import { gql } from '@apollo/client'
import { userDeliveryRequestData } from '../utils'

const fetchDeliveryRequests = gql`
  query fetchDeliveryRequests($shipmentId: ID!, $authenticationToken: String!) {
    fetchDeliveryRequests(
      shipmentId: $shipmentId
      authenticationToken: $authenticationToken
    ) {
      edges {
        node {
          ${userDeliveryRequestData}
        }
      }
    }
  }
`
export default fetchDeliveryRequests
