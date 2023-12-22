import { gql } from '@apollo/client'
import { userDeliveryRequestData } from '../utils'

const updateDeliveryRequestStatus = gql`
  mutation updateDeliveryRequestStatus(
    $deliveryRequestId: ID!
    $status: DeliveryRequestStatus!
    $authenticationToken: String!
  ) {
    updateDeliveryRequestStatus(
      deliveryRequestId: $deliveryRequestId
      status: $status
      authenticationToken: $authenticationToken
    ) {
      ${userDeliveryRequestData}
    }
  }
`
export default updateDeliveryRequestStatus
