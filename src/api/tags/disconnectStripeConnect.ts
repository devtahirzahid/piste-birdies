import { gql } from '@apollo/client'

const disconnectStripeConnect = gql`
  mutation createStripeConnect($authenticationToken: String!, $id: ID!) {
    disconnectStripeConnect(
      authenticationToken: $authenticationToken
      id: $id
    ) {
      message
    }
  }
`
export default disconnectStripeConnect
