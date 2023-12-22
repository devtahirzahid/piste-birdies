import { useState, useEffect } from 'react'
import { useMutation, gql } from '@apollo/client'
import { errorHandler } from './helper'

type FormDataType = {
  firstName: string
  lastName: string
  email: string
  password: string
  role: string
}

type UseRegisterType = {
  data: any
  loading: boolean
}

type RunQueryType = {
  formData: FormDataType
  errorCallback?: () => void
}
const queryName = 'createUser'

const createUser = gql`
  mutation ${queryName}(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $role: String
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      authProvider: { credentials: { email: $email, password: $password } }
      role: $role
    ) {
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
const useRegister = () => {
  const [requestData, setRequestData] = useState<UseRegisterType>({
    data: null,
    loading: false,
  })

  const [register, { loading: apiLoading, data: apiData }] =
    useMutation(createUser)

  useEffect(() => {
    setRequestData({ data: apiData, loading: apiLoading })
  }, [apiData, apiLoading])

  const runQuery = ({ formData, errorCallback }: RunQueryType) => {
    const { firstName, lastName, email, password, role } = formData
    register({
      variables: {
        firstName,
        lastName,
        email,
        password,
        role,
      },
      errorPolicy: 'all',
      onError: (errObj) =>
        errorHandler({
          error: errObj,
          silent: false,
          queryName,
          errorCallback,
        }),
    })
  }

  return [runQuery, requestData]
}

export default useRegister
