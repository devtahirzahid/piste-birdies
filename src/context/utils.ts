export type UserDataType = {
  confirmed: boolean
  verified: boolean
  email: string
  firstName: string
  id: string
  lastName: string
  role: string
  avatar: string
  phoneNumber: string
  unverifiedCarrier?: boolean
  isSender?: boolean
  isCarrier?: boolean
  onboarded?: boolean
  stripeConnected?: boolean
  authenticationToken: string
}