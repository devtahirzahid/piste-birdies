import { gql } from '@apollo/client'
import { userDeliveryRequestData } from '../utils'

const createDeliveryRequest = gql`
  mutation createDeliveryRequest(
    $shipmentId: ID!
    $deadlineDate: ISO8601DateTime!
    $price: String!
    $authenticationToken: String!
  ) {
    createDeliveryRequest(
      shipmentId: $shipmentId
      deadlineDate: $deadlineDate
      price: $price
      authenticationToken: $authenticationToken
    ) {
      ${userDeliveryRequestData}
    }
  }
`
export default createDeliveryRequest
