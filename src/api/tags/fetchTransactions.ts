import { gql } from '@apollo/client'

const fetchTransactions = gql`
  query fetchTransactions($authenticationToken: String!) {
    fetchTransactions(authenticationToken: $authenticationToken) {
      edges {
        node {
          id
          transactionType
          amount
          title
          summary
        }
      }
    }
  }
`
export default fetchTransactions
