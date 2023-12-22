import { useState, useEffect } from 'react'
import { useMutation, gql } from '@apollo/client'
import { errorHandler } from './helper'

type ConfirmUserType = {
  data: any
  loading: boolean
}

const queryName = 'confirmUser'

const confirmUser = gql`
  mutation ${queryName}($confirmationToken: String!) {
    confirmUser(confirmationToken: $confirmationToken) {
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
    }
  }
`
const useConfirmEmail = () => {
  const [requestData, setRequestData] = useState<ConfirmUserType>({
    data: null,
    loading: false,
  })

  const [confirmEmail, { loading: apiLoading, data: apiData, error }] =
    useMutation(confirmUser)

  useEffect(() => {
    setRequestData({ data: apiData, loading: apiLoading })
  }, [apiData, apiLoading])

  useEffect(() => {
    if (error) {
      setRequestData({ ...requestData })
      errorHandler({
        error,
        silent: false,
        queryName,
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error])

  const runQuery = (confirmationToken: string) => {
    confirmEmail({
      variables: {
        confirmationToken,
      },
      errorPolicy: 'all',
    })
  }

  return [runQuery, requestData]
}

export default useConfirmEmail
