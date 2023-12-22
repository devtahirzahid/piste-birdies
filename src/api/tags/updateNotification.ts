import { gql } from '@apollo/client'

const updateNotification = gql`
  mutation updateNotification(
    $notificationId: ID!
    $readAt: ISO8601DateTime!
    $authenticationToken: String!
  ) {
    updateNotification(
      readAt: $readAt
      notificationId: $notificationId
      authenticationToken: $authenticationToken
    ) {
      id
    }
  }
`

export default updateNotification
