import { useState, useEffect } from 'react'
import { useLazyQuery, gql } from '@apollo/client'
import { errorHandler } from './helper'

type UserStatisticsDataType = {
  data: any
  loading: boolean
}

const queryName = 'fetchCurrentUser'

const fetchCurrentUser = gql`
  query ${queryName}($authenticationToken: String!) {
    fetchCurrentUser(authenticationToken: $authenticationToken) {
      id
      firstName
      lastName
      email
      confirmed
      role
      avatar
      verified
      onboarded
      stripeConnected
      authenticationToken
      phoneNumber
    }
  }
`

const useFetchCurrentUser = () => {
  const [requestData, setRequestData] = useState<UserStatisticsDataType>({
    data: null,
    loading: false,
  })

  const [fetchUser, { loading: apiLoading, data: apiData }] = useLazyQuery(
    fetchCurrentUser,
    {
      errorPolicy: 'all',
      fetchPolicy: 'no-cache',
      onError: (errObj) =>
        errorHandler({ error: errObj, silent: false, queryName }),
    }
  )

  useEffect(() => {
    setRequestData({ data: apiData, loading: apiLoading })
  }, [apiData, apiLoading])

  const runQuery = (authenticationToken: string) => {
    fetchUser({
      variables: {
        authenticationToken,
      },
    })
  }

  return [runQuery, requestData]
}

export default useFetchCurrentUser
