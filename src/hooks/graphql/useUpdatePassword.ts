import { useState, useEffect } from 'react'
import { useMutation, gql } from '@apollo/client'
import { errorHandler } from './helper'

type FormDataType = {
  newPassword: string
  currentPassword: string
  authenticationToken: string
}

type UpdatePasswordType = {
  data: any
  loading: boolean
}

const queryName = 'updatePassword'

const updatePassword = gql`
  mutation ${queryName}($newPassword: String!, $authenticationToken: String!, $currentPassword: String!) {
    updatePassword(
      newPassword: $newPassword
      currentPassword: $currentPassword
      authenticationToken: $authenticationToken
    ) {
      message
    }
  }
`

const useUpdatePassword = () => {
  const [requestData, setRequestData] = useState<UpdatePasswordType>({
    data: null,
    loading: false,
  })

  const [submit, { loading: apiLoading, data: apiData, error }] = useMutation(
    updatePassword,
    {
      errorPolicy: 'all',
    }
  )

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

  const runQuery = (formData: FormDataType) => {
    const { authenticationToken, newPassword, currentPassword } = formData

    submit({
      variables: {
        authenticationToken,
        newPassword,
        currentPassword,
      },
    })
  }

  return [runQuery, requestData]
}

export default useUpdatePassword
