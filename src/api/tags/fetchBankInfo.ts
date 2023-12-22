import { gql } from '@apollo/client'
import { bankInfoData } from '../utils'

const fetchBankInfo = gql`
  query fetchBankInfo($authenticationToken: String!) {
    fetchBankInfo(authenticationToken: $authenticationToken) {
      ${bankInfoData}
    }
  }
`
export default fetchBankInfo
