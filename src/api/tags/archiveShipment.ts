import { gql } from '@apollo/client'
import { shipmentData } from '../utils'

const archiveShipment = gql`
  mutation archiveShipment($authenticationToken: String!, $shipmentId: ID!) {
    archiveShipment(
      authenticationToken: $authenticationToken
      shipmentId: $shipmentId
    ) {
      ${shipmentData}
    }
  }
`

export default archiveShipment
