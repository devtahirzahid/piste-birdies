import { gql } from '@apollo/client'
import { ratingData } from '../utils'

const fetchUserRatings = gql`
  query fetchUserRatings(
    $first: Int
    $after: String
    $authenticationToken: String!
  ) {
    fetchUserRatings(
      first: $first
      after: $after
      authenticationToken: $authenticationToken
    ) {
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          ${ratingData}
        }
      }
    }
  }
`
export default fetchUserRatings
