import { gql } from '@apollo/client'

const createPaymentIntent = gql`
  mutation createPaymentIntent(
    $authenticationToken: String!
    $currency: String!
    $amount: Float!
  ) {
    createPaymentIntent(
      authenticationToken: $authenticationToken
      currency: $currency
      amount: $amount
    ) {
      id
      clientSecret
    }
  }
`
export default createPaymentIntent
