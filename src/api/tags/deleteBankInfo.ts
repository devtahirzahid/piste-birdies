import { gql } from '@apollo/client'
import { bankInfoData } from '../utils'

const deleteBankInfo = gql`
  mutation deleteBankInfo($authenticationToken: String!) {
    deleteBankInfo(authenticationToken: $authenticationToken) {
      ${bankInfoData}
    }
  }
`
export default deleteBankInfo
