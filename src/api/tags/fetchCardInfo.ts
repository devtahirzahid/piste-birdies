import { gql } from '@apollo/client'
import { cardInfoData } from '../utils'

const fetchCardInfo = gql`
  query fetchCardInfo($authenticationToken: String!) {
    fetchCardInfo(authenticationToken: $authenticationToken) {
      ${cardInfoData}
    }
  }
`
export default fetchCardInfo
