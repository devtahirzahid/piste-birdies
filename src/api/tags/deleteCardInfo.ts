import { gql } from '@apollo/client'
import { cardInfoData } from '../utils'

const deleteCardInfo = gql`
  mutation deleteCardInfo($authenticationToken: String!) {
    deleteCardInfo(authenticationToken: $authenticationToken) {
      ${cardInfoData}
    }
  }
`
export default deleteCardInfo
