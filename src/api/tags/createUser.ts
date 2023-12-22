import { gql } from '@apollo/client'

const createUser = gql`
  mutation createUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $role: String
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      authProvider: { credentials: { email: $email, password: $password } }
      role: $role
    ) {
      id
      lastName
      firstName
      email
      authenticationToken
      role
    }
  }
`
export default createUser
