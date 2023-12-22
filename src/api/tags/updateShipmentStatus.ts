import { gql } from '@apollo/client'
import { shipmentStatusData } from '../utils'

const updateShipmentStatus = gql`
  mutation updateShipmentStatus(
    $status: ShipmentStatus!
    $shipmentId: ID!
    $authenticationToken: String!
  ) {
    updateShipmentStatus(
      status: $status
      shipmentId: $shipmentId
      authenticationToken: $authenticationToken
    ) {
      ${shipmentStatusData}
    }
  }
`

export default updateShipmentStatus
