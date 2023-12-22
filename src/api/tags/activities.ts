import { gql } from '@apollo/client'

const fetchActivities = gql`
  query fetchActivities(
    $authenticationToken: String!
    $period: Period!
    $duration: Int!
  ) {
    fetchUserActivities(
      period: $period
      authenticationToken: $authenticationToken
      duration: $duration
    ) {
      postedShipments
      rejectedDeliveryRequests
      deliveredShipments
    }
  }
`
export default fetchActivities
