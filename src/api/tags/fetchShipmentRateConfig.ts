import { gql } from '@apollo/client'

const fetchShipmentRateConfig = gql`
  query fetchShipmentRateConfig($authenticationToken: String!) {
    fetchShipmentRateConfig(authenticationToken: $authenticationToken) {
      baseItemRate
      heightBaseRate
      mileBaseRate
      weightBaseRate
    }
  }
`
export default fetchShipmentRateConfig
