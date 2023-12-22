import { gql } from '@apollo/client'

const confirmUser = gql`
  mutation confirmUser($confirmationToken: String!) {
    confirmUser(confirmationToken: $confirmationToken) {
      id
      lastName
      firstName
      email
      confirmed
    }
  }
`
export default confirmUser
