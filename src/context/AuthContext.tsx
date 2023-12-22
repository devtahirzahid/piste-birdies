/* eslint-disable react-hooks/exhaustive-deps */
// ** React Imports
import React, { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'

// ** Config
import authConfig from '@configs/auth'
import useLogin from '@hooks/graphql/useLogin'
import useForgotPassword from '@hooks/graphql/useForgotPassword' // added import statement
import useConfirmEmail from '@hooks/graphql/useConfirmEmail' // added import statement
import useRegister from '@hooks/graphql/useRegister' // added import statement
import useResetPassword from '@hooks/graphql/useResetPassword' // added import statement
import useUpdatePassword from '@hooks/graphql/useUpdatePassword' // added import statement
import useFetchCurrentUser from '@hooks/graphql/useFetchCurrentUser'

// ** Types
import {
  AuthValuesType,
  RegisterParams,
  LoginParams,
  ErrCallbackType,
  UserDataType,
  ForgotPasswordParams,
  UpdateUserParams,
  UpdatePasswordParams,
  ResetPasswordParams
} from '../@core/context/types'
import useUpdateUser from '@hooks/graphql/useUpdateUser'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  authToken: '',
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  forgotPassword: () => Promise.resolve(), // added forgotPassword default value
  confirmEmail: () => Promise.resolve(),
  resetPassword: () => Promise.resolve(), // added resetPassword default value
  updatePassword: () => Promise.resolve(), // added updatePassword default value
  updateUser: () => Promise.resolve(),
  refreshUser: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)
type Props = {
  children: ReactNode
}
const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [authToken, setAuthToken] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)
  const [rememberMeChoice, setRememberMe] = useState(false)

  // ** Hooks
  const router = useRouter()

  //@ts-ignore
  const [fireLoginApi, { data: loginData, loading: loginLoading }] = useLogin()
  const [
    fireConfirmEmailApi,

    //@ts-ignore
    { data: confirmEmailData, loading: confirmEmailLoading }
  ] = useConfirmEmail()
  const [
    fireCreateUserApi,

    //@ts-ignore
    { data: createUserData, loading: createUserLoading }
  ] = useRegister()
  const [
    fireFetchCurrentUserApi,

    //@ts-ignore
    { data: currentUserData, loading: currentUserLoading }
  ] = useFetchCurrentUser()

  const [
    fireForgotPasswordApi,

    //@ts-ignore
    { data: forgotPasswordData, loading: forgotPasswordLoading }
  ] = useForgotPassword() // added useForgotPassword hook
  const [
    fireResetPasswordApi,

    //@ts-ignore
    { data: resetPasswordData, loading: resetPasswordLoading }
  ] = useResetPassword() // added useResetPassword hook

  const [
    fireUpdatePasswordApi,

    //@ts-ignore
    { data: updatePasswordData, loading: updatePasswordLoading }
  ] = useUpdatePassword() // added useUpdatePassword hook

  const [
    fireUpdateUserApi,

    //@ts-ignore
    { data: updateUserData, loading: updateUserLoading }
  ] = useUpdateUser() // added useUpdateUser hook

  const setUserData = (user: UserDataType) => {
    const isVerified = user.verified
    const isCarrier = user.role === 'carrier'
    const isSender = user.role === 'sender'
    const unverifiedCarrier = isCarrier && !isVerified
    const userData = { ...user, unverifiedCarrier, isSender, isCarrier }
    setUser({ ...userData })
  }
  const signIn = (user: UserDataType, routeToHome?: boolean) => {
    const authenticationToken = user.authenticationToken
    setUserData(user)
    setAuthToken(authenticationToken)
    window.localStorage.setItem(authConfig.storageTokenKeyName, authenticationToken)
    window.localStorage.setItem('userData', JSON.stringify(user))
    window.localStorage.removeItem('apiError')
    if (routeToHome) {
      let redirectURL = '/'
      if (user.role === 'carrier' && !user.verified) {
        redirectURL = '/verification-pending'
      }
      router.replace(redirectURL as string)
    }
  }
  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    toast.success('Signed Out!')
    router.replace('/login')
  }
  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
      if (storedToken) {
        //@ts-ignore
        fireFetchCurrentUserApi(storedToken)
      } else {
        setLoading(false)
      }
    }
    initAuth()
  }, [])
  useEffect(() => {
    setLoading(loginLoading)
    if (loginData) {
      signIn(loginData.signIn.user, true)
      toast.success('Signed In!')
    }
  }, [loginData, loginLoading, rememberMeChoice])
  useEffect(() => {
    setLoading(currentUserLoading)
    if (currentUserData) {
      signIn(currentUserData.fetchCurrentUser, false)
    }
  }, [currentUserData, currentUserLoading])
  useEffect(() => {
    setLoading(currentUserLoading)

    if (currentUserData) {
      signIn(currentUserData.fetchCurrentUser, false)
    }
  }, [currentUserData, currentUserLoading])

  useEffect(() => {
    setLoading(forgotPasswordLoading)
    if (forgotPasswordData) {
      const { resetPassword } = forgotPasswordData
      toast.success(resetPassword.message)
      router.replace('/login')
    }
  }, [forgotPasswordData, forgotPasswordLoading])
  useEffect(() => {
    setLoading(confirmEmailLoading)
    if (confirmEmailData) {
      toast.success('Email Confirmed')
      signIn(confirmEmailData.confirmUser, true)
    }
  }, [confirmEmailData, confirmEmailLoading])
  useEffect(() => {
    setLoading(createUserLoading)
    if (createUserData) {
      signIn(createUserData.createUser, true)
    }
  }, [createUserData, createUserLoading])
  useEffect(() => {
    setLoading(resetPasswordLoading)
    if (resetPasswordData) {
      const { resetPassword } = resetPasswordData
      toast.success(resetPassword.message)
      router.replace('/login')
    }
  }, [resetPasswordData, resetPasswordLoading])

  useEffect(() => {
    setLoading(updatePasswordLoading)

    if (updatePasswordData) {
      const { updatePassword } = updatePasswordData
      toast.success(updatePassword.message)
    }
  }, [updatePasswordData, updatePasswordLoading])

  useEffect(() => {
    setLoading(updateUserLoading)

    if (updateUserData) {
      const { updateUser } = updateUserData
      signIn(updateUser, false)
      toast.success('Account details updated!')
    }
  }, [updateUserData, updateUserLoading])

  const handleLogin = (params: LoginParams) => {
    setRememberMe(params.rememberMe)

    //@ts-ignore
    fireLoginApi({ formData: params })
  }
  const handleRegister = (params: RegisterParams, errorCallback?: ErrCallbackType) => {
    //@ts-ignore
    fireCreateUserApi({ formData: params, errorCallback })
  }
  const handleForgotPassword = (params: ForgotPasswordParams) => {
    //@ts-ignore
    fireForgotPasswordApi(params)
  }
  const handleConfirmEmail = (confirmationToken: string) => {
    //@ts-ignore
    fireConfirmEmailApi(confirmationToken)
  }
  const handleResetPassword = (params: ResetPasswordParams) => {
    //@ts-ignore
    fireResetPasswordApi(params)
  }

  const handleUpdatePassword = (params: UpdatePasswordParams) => {
    //@ts-ignore
    fireUpdatePasswordApi(params)
  }
  const handleUpdateUser = (params: UpdateUserParams) => {
    //@ts-ignore
    fireUpdateUserApi(params)
  }

  const handleRefreshUser = () => {
    //@ts-ignore
    fireFetchCurrentUserApi(authToken)
  }

  const values = {
    user,
    authToken,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
    forgotPassword: handleForgotPassword,
    confirmEmail: handleConfirmEmail,
    resetPassword: handleResetPassword,
    updatePassword: handleUpdatePassword,
    updateUser: handleUpdateUser,
    refreshUser: handleRefreshUser
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}
export { AuthContext, AuthProvider }
