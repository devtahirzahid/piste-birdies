import { gql } from '@apollo/client'

const userStatistics = gql`
  query userStatistics($authenticationToken: String!) {
    fetchShipmentStatistics(authenticationToken: $authenticationToken) {
      allShipments
      postedShipments
      approvedShipments
      deliveredShipments
      activeShipments
      cancelledShipments
      shipmentsInTransit
      deliveryRequests
      deliveriesInProgress
      deliveredDeliveries
      openShipments
      earnings
      debits
    }
  }
`
export default userStatistics
