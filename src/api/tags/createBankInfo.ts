import { gql } from '@apollo/client'
import { bankInfoData } from '../utils'

const createBankInfo = gql`
  mutation createBankInfo(
    $accountNumber: String!
    $accountName: String!
    $routingNumber: String!
    $authenticationToken: String!
  ) {
    createBankInfo(
      accountNumber: $accountNumber
      accountName: $accountName
      routingNumber: $routingNumber
      authenticationToken: $authenticationToken
    ) {
      ${bankInfoData}
    }
  }
`
export default createBankInfo
