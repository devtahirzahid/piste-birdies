import { gql } from '@apollo/client'

const updateUser = gql`
  mutation updateUser(
    $firstName: String!
    $lastName: String!
    $avatar: String
    $authenticationToken: String!
  ) {
    updateUser(
      firstName: $firstName
      lastName: $lastName
      avatar: $avatar
      authenticationToken: $authenticationToken
    ) {
      id
      lastName
      firstName
      email
      avatar
    }
  }
`
export default updateUser
