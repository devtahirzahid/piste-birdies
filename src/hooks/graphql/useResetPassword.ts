import { useState, useEffect } from 'react'
import { useMutation, gql } from '@apollo/client'
import { errorHandler } from './helper'

type FormDataType = {
  password: string
  resetPasswordToken: string
}

type ResetPasswordType = {
  data: any
  loading: boolean
}

const queryName = 'resetPassword'

const resetPassword = gql`
  mutation resetPassword($password: String!, $resetPasswordToken: String!) {
    resetPassword(
      password: $password
      resetPasswordToken: $resetPasswordToken
    ) {
      message
    }
  }
`

const useResetPassword = () => {
  const [requestData, setRequestData] = useState<ResetPasswordType>({
    data: null,
    loading: false,
  })

  const [triggerPassword, { loading: apiLoading, data: apiData }] = useMutation(
    resetPassword,
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
    const { password, resetPasswordToken } = formData

    triggerPassword({
      variables: {
        password,
        resetPasswordToken,
      },
    })
  }

  return [runQuery, requestData]
}

export default useResetPassword
