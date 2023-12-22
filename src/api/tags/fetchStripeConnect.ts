import { gql } from '@apollo/client'

const fetchStripeConnect = gql`
  query fetchStripeConnect($authenticationToken: String!) {
    fetchStripeConnect(authenticationToken: $authenticationToken) {
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
export default fetchStripeConnect
