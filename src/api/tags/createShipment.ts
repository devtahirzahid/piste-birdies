import { gql } from '@apollo/client'
import { shipmentData } from '../utils'

const createShipment = gql`
  mutation createShipment(
    $shipmentData: ShipmentInput!
    $images: [String!]
    $addresses: JSON!
    $recipient: RecipientInput!
    $dimensions: [DimensionInput!]!
    $authenticationToken: String!
  ) {
    createShipment(
      shipmentData: $shipmentData
      addresses: $addresses
      authenticationToken: $authenticationToken
      recipient: $recipient
      dimensions: $dimensions
      images: $images
    ) {
      ${shipmentData}
    }
  }
`
export default createShipment
