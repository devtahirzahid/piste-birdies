import { gql } from '@apollo/client'

const signIn = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(credentials: { email: $email, password: $password }) {
      authenticationToken
      user {
        id
        firstName
        lastName
        email
        confirmed
        role
      }
    }
  }
`
export default signIn
