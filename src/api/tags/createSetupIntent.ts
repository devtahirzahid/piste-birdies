import { gql } from '@apollo/client'

const createSetupIntent = gql`
  mutation createSetupIntent($authenticationToken: String!) {
    createSetupIntent(authenticationToken: $authenticationToken) {
      clientSecret
    }
  }
`
export default createSetupIntent
