import { gql } from '@apollo/client'

const createMessage = gql`
  mutation createMessage(
    $shipmentId: ID!
    $authenticationToken: String!
    $receiverId: ID!
    $message: String!
  ) {
    createMessage(
      shipmentId: $shipmentId
      authenticationToken: $authenticationToken
      receiverId: $receiverId
      message: $message
    ) {
      message
    }
  }
`
export default createMessage
