import { useState, useEffect } from 'react'
import { useMutation, gql } from '@apollo/client'
import { errorHandler } from './helper'

type FormDataType = {
  email: string
}

type ForgotPasswordType = {
  data: any
  loading: boolean
}

const queryName = 'forgotPassword'

const forgotPassword = gql`
  mutation resetPassword($email: String!) {
    resetPassword(email: $email) {
      message
    }
  }
`
const useForgotPassword = () => {
  const [requestData, setRequestData] = useState<ForgotPasswordType>({
    data: null,
    loading: false,
  })

  const [triggerEmail, { loading: apiLoading, data: apiData }] = useMutation(
    forgotPassword,
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
    const { email } = formData

    triggerEmail({
      variables: {
        email,
      },
    })
  }

  return [runQuery, requestData]
}

export default useForgotPassword
