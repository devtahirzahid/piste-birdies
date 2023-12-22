const shipmentStatusData = `
  status
  initiatedAt
  deliveredAt
  pickedUpAt
  inTransitAt
`

const ratingData = `
  id
  comment
  rating
  receiver {
    id
    avatar
    lastName
    firstName
  }
  sender {
    id
    avatar
    lastName
    firstName
  }
`

const ownerData = `
  id
  email
  firstName
  lastName
  avatar
  averageRatings
  reviewsCount
`

const userDeliveryRequestData = `
  id
  price
  createdAt
  status
  user {
    ${ownerData}
  }
`

const addressesData = `
  id
  lineOne
  lineTwo
  googlePlaceId
  addressType
  latitude
  longitude
  country
  fullAddress
  city
  state
  zipCode
  fullAddress
`

const shipmentData = `
  id
  description
  images
  deliveredImage
  deadlineDate
  price
  isOwner
  isRunner
  createdAt
  conversationActive
  numberOfBids
  runnerRated
  ownerRated
  deliveryPrice
  editable
  slug
  isServiceCenterShipment
  serviceCenterId
  isDropOff
  ratings {
    ${ratingData}
  }
  ${shipmentStatusData}
  userBid {
    ${userDeliveryRequestData}
  }
  approvedBid {
    ${userDeliveryRequestData}
  }
  owner {
    ${ownerData}
  }
  runner {
    email
    ${ownerData}
  }
  addresses {
    ${addressesData}
  }
  dimensions {
    dimension
    quantity
    weight
  }
  recipient {
    id
    email
    firstName
    lastName
    phoneNumber
  }
`

const cardInfoData = `
  id
  brand
  lastFour
  expiryDate
  name
  stripeCardId
`

const bankInfoData = `
  id
  bankName
  accountName
  lastFour
`

export {
  shipmentData,
  shipmentStatusData,
  userDeliveryRequestData,
  cardInfoData,
  bankInfoData,
  ratingData,
}
