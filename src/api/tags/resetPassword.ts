import { gql } from '@apollo/client'

const forgotPassword = gql`
  mutation resetPassword($email: String!) {
    resetPassword(email: $email) {
      message
    }
  }
`

const resetPassword = gql`
  mutation resetPassword($password: String!, $resetPasswordToken: String!) {
    resetPassword(
      password: $password
      resetPasswordToken: $resetPasswordToken
    ) {
      message
    }
  }
`

export { forgotPassword, resetPassword }
