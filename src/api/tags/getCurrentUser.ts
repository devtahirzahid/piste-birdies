import { gql } from '@apollo/client'

const getCurrentUser = gql`
  query fetchCurrentUser($authenticationToken: String!) {
    fetchCurrentUser(authenticationToken: $authenticationToken) {
      id
      avatar
      firstName
      lastName
      email
      authenticationToken
      role
      verified
      stripeConnected
      averageRatings
      reviewsCount
      confirmed
    }
  }
`
export default getCurrentUser
