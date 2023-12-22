import { useState, useEffect } from 'react'
import { useMutation, gql } from '@apollo/client'
import { errorHandler } from './helper'

type FormDataType = {
  firstName: string
  lastName: string
  avatar: string
  authenticationToken: string
  email: string
  phoneNumber: string
}

type UpdateUserType = {
  data: any
  loading: boolean
}

const queryName = 'updateUser'

const updateUser = gql`
  mutation ${queryName}(
    $firstName: String!
    $lastName: String!
    $avatar: String
    $authenticationToken: String!
    $email: String!
    $phoneNumber: String!
  ) {
    updateUser(
      firstName: $firstName
      lastName: $lastName
      avatar: $avatar
      authenticationToken: $authenticationToken
      email: $email
      phoneNumber: $phoneNumber
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
      phoneNumber
    }
  }
`

const useUpdateUser = () => {
  const [requestData, setRequestData] = useState<UpdateUserType>({
    data: null,
    loading: false,
  })

  const [submit, { loading: apiLoading, data: apiData }] = useMutation(
    updateUser,
    {
      errorPolicy: 'all',
      onError: (errObj) =>
        errorHandler({ error: errObj, silent: false, queryName }),
    }
  )

  useEffect(() => {
    setRequestData({ data: apiData, loading: apiLoading })
  }, [apiData, apiLoading])

  const runQuery = (formData: FormDataType) => {
    const {
      avatar,
      firstName,
      lastName,
      authenticationToken,
      email,
      phoneNumber,
    } = formData

    submit({
      variables: {
        avatar,
        firstName,
        lastName,
        authenticationToken,
        email,
        phoneNumber,
      },
    })
  }

  return [runQuery, requestData]
}

export default useUpdateUser
