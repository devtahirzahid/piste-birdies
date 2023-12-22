import { gql } from '@apollo/client'

const createUserRating = gql`
  mutation createUserRating(
    $authenticationToken: String!
    $senderId: ID!
    $receiverId: ID!
    $rating: Int!
    $comment: String!
    $shipmentId: ID!
  ) {
    createUserRating(
      authenticationToken: $authenticationToken
      senderId: $senderId
      receiverId: $receiverId
      rating: $rating
      comment: $comment
      shipmentId: $shipmentId
    ) {
      comment
      rating
      receiver {
        id
        firstName
        avatar
      }
      sender {
        id
        firstName
        avatar
      }
    }
  }
`
export default createUserRating
