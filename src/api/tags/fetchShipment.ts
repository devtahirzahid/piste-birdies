import { gql } from '@apollo/client'
import { shipmentData } from '../utils'

const fetchShipment = gql`
  query fetchShipment($shipmentId: ID!, $authenticationToken: String!) {
    fetchShipment(
      shipmentId: $shipmentId
      authenticationToken: $authenticationToken
    ) {
      ${shipmentData}
    }
  }
`
export default fetchShipment
