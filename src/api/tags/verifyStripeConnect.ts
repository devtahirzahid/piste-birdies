import { gql } from '@apollo/client'

const verifyStripeConnect = gql`
  mutation verifyStripeConnect($authenticationToken: String!, $code: String!) {
    verifyStripeConnect(
      authenticationToken: $authenticationToken
      code: $code
    ) {
      id
      accountId
      allowUnlink
      chargesEnabled
      detailsSubmitted
      displayName
      payoutsEnabled
    }
  }
`
export default verifyStripeConnect
