// import { bool, boolean } from 'yup'

export type ErrCallbackType = (err: { [key: string]: string }) => void

export type LoginParams = {
  email: string
  password: string
  rememberMe: boolean
}

export type RegisterParams = {
  email: string
  firstName: string
  lastName: string
  password: string
  role: string
}

export type UpdateUserParams = {
  avatar?: string
  firstName?: string
  lastName?: string
  email?: string
  phoneNumber?: string
  authenticationToken?: string
}

export type VerifyStripeParams = {
  code: any
  authenticationToken: string
}
export type DisconnectStripeParams = {
  id: string
  authenticationToken: string
}

export type FetchStripeConnectParams = {
  authenticationToken: string
}

export type ArchiveShipmentParams = {
  authenticationToken: string
  shipmentId: string
}

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

export type ModalValueTypes = {
  currentModal: string | null
  openModal: (name: string) => void
  closeModal: () => void
}

export type ConversationValueTypes = {
  loading: boolean
  toggleSentMessage: boolean
  chatNodes: any
  messageNodes: any
  selectedShipment: any
  selectedChat: any
  chatUser: any
  updateSelectedShipment: any
  updateChatUser: any
  updateMessagesNodes: any
  fetchAllConversations: (authToken: string) => void
  fetchAllMessages: (authToken: string, shipmentId: any) => void
  fetchMoreMessages: (params: any) => void
  createChatMessage: (params: any) => void
}

export type ForgotPasswordParams = {
  email: string
}

export type ResetPasswordParams = {
  password: string
  resetPasswordToken: string
}

export type UpdatePasswordParams = {
  newPassword?: string
  currentPassword?: string
  authenticationToken?: string
}

export type StatisticsParams = {
  authenticationToken: string | null
}

export type Transaction = {
  node: {
    id: number
    title: string
    amount: string
    summary: string
    transactionType: string
  }
}

export type StatisticsValueTypes = {
  loading: boolean
  reviews: Reviews[]
  transactions: Transaction[]
  fetchTransactions: () => void
  fetchUserRatings: () => void
}

export type Reviews = {
  node: {
    id: number
    comment: string
    rating: any
    receiver: any
    sender: any
  }
}

export type RecipientType = {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  id?: string
}

export type ShipmentValuesType = {
  createDeliveryRequest: (authToken: string, formData: any) => void
  fetchStatistics: (authToken: string) => void
  fetchCarrierShipments: (authToken: string) => void
  fetchDeliveryHistory: (authToken: string) => void
  fetchShipmentHistory: (authToken: string) => void
  fetchShipment: (authToken: string, shipmentId: any) => void
  fetchDeliveryRequests: (authToken: string, shipmentId: any) => void
  updateDeliveryRequestStatus: (
    authToken: string,
    deliveryRequestId: any,
    status: any,
    errorCallback?: ErrCallbackType
  ) => void
  updateShipmentStatus: (
    authToken: string,
    shipmentId: any,
    status: any,
    errorCallback?: ErrCallbackType
  ) => void
  updateDeliveredImage: (
    deliveredMedia: any,
    authToken: string,
    shipmentId: any,
    status: any,
    errorCallback?: ErrCallbackType
  ) => void
  updatedDeliveryRequestData: any
  fetchMoreShipments: (params: any) => void
  createShipment: (params: any) => void
  createUserRating: (params: any) => void
  archiveShipment: (authenticationToken: string, shipmentId: any) => void
  fetchShipmentRate: (authToken: string) => void
  updateShipmentInfo: (
    authToken: string,
    shipmentId: string,
    recipient: RecipientType
  ) => void
  shipmentStatistics: {}
  shipmentRates: {
    mileBaseRate: number
    weightBaseRate: number
  }
  shipmentDeliveryRequests: []
  shipmentData: ShipmentDataType
  pageInformation: any
  carrierShipments: ShipmentDataType[]
  deliveryHistory: ShipmentDataType[]
  shipmentHistory: ShipmentDataType[]
  loading: boolean
  shipmentCreated: boolean
  carrierDeliveryRequest: any
  updateShipment: any
  setShipment: any
  resetShipment: any
  userRatingData: any
  fetchAllServiceCenters: (authToken: string, filtersData: any) => void
  serviceCentersData: any
}

export type StripeValuesType = {
  loading: boolean
  stripeLoading: boolean
  connectedDetails: any
  setStripeLoading: (value: boolean) => void
  stripe: any | null
  intent: { clientSecret?: undefined; id: string | null }
  createPaymentIntent: (authenticationToken: string, amount: number) => void
  resetIntent: () => void
  updatePaymentIntent: (authenticationToken: string, amount: number) => void
  verifyStripe: (
    params: VerifyStripeParams,
    errorCallback?: ErrCallbackType
  ) => void
  fetchStripeConnect: (
    params: FetchStripeConnectParams,
    errorCallback?: ErrCallbackType
  ) => void
  disconnectStripe: (
    params: DisconnectStripeParams,
    errorCallback?: ErrCallbackType
  ) => void
}

export type ShipmentDataType = {
  addresses: Array<any>
  createdAt: string
  isOwner: boolean
  isRunner: boolean
  price: string
  description: string
  deadlineDate: string
  status: string
  images: Array<string>
  initiatedAt: string
  pickedUpAt: string | any
  inTransitAt: string
  deliveredAt: string

  userBid: string
  approvedBid: string
  deliveryRequests: Array<any>
  dimensions: Array<any>
  ratings: Array<any>
  deliveryPrice: string
  slug: string
  id: number | string | null
  deliveredImage: string
}

export type AuthValuesType = {
  loading: boolean
  logout: () => void
  authToken: string
  user: UserDataType | null
  setLoading: (value: boolean) => void
  setUser: (value: UserDataType) => void
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
  register: (params: RegisterParams, errorCallback?: ErrCallbackType) => void
  forgotPassword: (
    params: ForgotPasswordParams,
    errorCallback?: ErrCallbackType
  ) => void
  confirmEmail: (confirmationToken: string) => void
  refreshUser: () => void
  resetPassword: (
    params: ResetPasswordParams,
    errorCallback?: ErrCallbackType
  ) => void
  updateUser: (
    params: UpdateUserParams,
    errorCallback?: ErrCallbackType
  ) => void
  updatePassword: (
    params: UpdatePasswordParams,
    errorCallback?: ErrCallbackType
  ) => void
}

export type NotificationNodeType = {
  id: string
  title: string
  message: string
  shipment: { slug: string }
  createdAt: string
  readAt: string
}

export type NotificationType = {
  cursor?: string
  node: NotificationNodeType
}

export type FetchNotificationPropsType = {
  first: number
  authenticationToken: string
  after?: string
}

export type NotificationsValueType = {
  loading: boolean
  notifications: NotificationType[]
  fetchNotification: () => void
  fetchRecentNotifications: () => void
  updateNoptification: (props: { id: string }) => void
}
