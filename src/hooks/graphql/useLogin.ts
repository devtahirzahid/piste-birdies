import { useState, useEffect } from 'react'
import { useMutation, gql } from '@apollo/client'
import { errorHandler } from './helper'

type FormDataType = {
  email: string
  password: string
}

type UseLoginType = {
  data: any
  loading: boolean
}

type RunQueryType = {
  formData: FormDataType
  errorCallback?: () => void
}

const queryName = 'signIn'

const signInQuery = gql`
  mutation ${queryName}($email: String!, $password: String!) {
    signIn(credentials: { email: $email, password: $password }) {
      user {
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
  }
`
const useLogin = () => {
  const [requestData, setRequestData] = useState<UseLoginType>({
    data: null,
    loading: false,
  })

  const [signInUser, { loading: apiLoading, data: apiData, error }] =
    useMutation(signInQuery)

  useEffect(() => {
    setRequestData({ data: apiData, loading: apiLoading })
  }, [apiData, apiLoading])

  useEffect(() => {
    if (error) {
      errorHandler({
        error,
        silent: false,
        queryName,
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error])

  const runQuery = ({ formData }: RunQueryType) => {
    const { email, password } = formData

    signInUser({
      variables: {
        email,
        password,
      },
      errorPolicy: 'all',
    })
  }

  return [runQuery, requestData]
}

export default useLogin
