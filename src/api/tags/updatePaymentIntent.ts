import { gql } from '@apollo/client'

const updatePaymentIntent = gql`
  mutation updatePaymentIntent(
    $authenticationToken: String!
    $intentId: String!
    $amount: Float!
  ) {
    updatePaymentIntent(
      authenticationToken: $authenticationToken
      intentId: $intentId
      amount: $amount
    ) {
      clientSecret
    }
  }
`
export default updatePaymentIntent
