export const senderPages = [
  'sender-only-page',
  'common-page',
  'chat-page',
  'home-page',
  'view-shipment',
  'account',
]
export const senderAbilities = [
  'rate-users',
  'account',
  'create-shipment',
  'view-sender-cards',
  'view-spending-reports',
  'view-shipment-history',
  'accept-delivery-request',
  'confirm-shipment-delivery',
]

export const unVerifiedCarrierPages = [
  'payments-page',
  'common-page',
  'verification-page',
]

export const verifiedCarrierPages = [
  'carrier-only-page',
  'chat-page',
  'payments-page',
  'common-page',
  'home-page',
  'view-shipment',
  'account',
]

export const unVerifiedCarrierAbilities = [
  'manage-stripe-payment',
  'payments-page',
]
export const verifiedCarrierAbilities = [
  'rate-users',
  'request-delivery',
  'view-carrier-cards',
  'view-earnings-reports',
  'view-delivery-history',
  'update-delivery-status',
  'view-shipment',
].concat(unVerifiedCarrierAbilities)
