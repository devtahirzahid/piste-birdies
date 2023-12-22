import { gql } from '@apollo/client'
import { cardInfoData } from '../utils'

const createCardInfo = gql`
  mutation createCardInfo(
    $paymentMethodId: String!
    $name: String!
    $authenticationToken: String!
  ) {
    createCardInfo(
      paymentMethodId: $paymentMethodId
      name: $name
      authenticationToken: $authenticationToken
    ) {
      ${cardInfoData}
    }
  }
`
export default createCardInfo
