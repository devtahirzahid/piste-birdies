import { gql } from '@apollo/client'
import { shipmentData } from '../utils'

const updateShipment = gql`
  mutation updateShipment(
    $shipmentId: ID!
    $shipmentData: ShipmentInput!
    $images: [String!]
    $addresses: JSON!
    $authenticationToken: String!
  ) {
    updateShipment(
      shipmentId: $shipmentId
      shipmentData: $shipmentData
      addresses: $addresses
      authenticationToken: $authenticationToken
      images: $images
    ) {
      ${shipmentData}
    }
  }
`
export default updateShipment
