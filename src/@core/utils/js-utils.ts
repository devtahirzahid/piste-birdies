const formatGraphQlError = (errObj: any, setErrors: any) => {
  const parsedError = JSON.parse(JSON.stringify(errObj))
  let errors = []

  if (parsedError.graphQLErrors) {
    errors = parsedError.graphQLErrors.map((gError: any) => gError.message)
  }

  setErrors(errors)
}

const escapeRegex = (text: string) =>
  text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')

const shipmentStatusMap = {
  DRAFT: 'DRAFT',
  PENDING: 'PENDING',
  OPEN: 'OPEN',
  INITIATED: 'INITIATED',
  PICKED_UP: 'PICKED_UP',
  IN_TRANSIT: 'IN_TRANSIT',
  DELIVERED: 'DELIVERED',

  // COMPLETED: 'COMPLETED',
  ARCHIVED: 'ARCHIVED',
  CLOSED: 'CLOSED',
  REJECTED: 'REJECTED',
}

const deliveryRequestsStatusMap = {
  PENDING: 'PENDING',
  CANCELLED: 'CANCELLED',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED',
}

const capitalize = (str: string) =>
  str?.toLowerCase()?.replace(/\b\w/g, (c) => c.toUpperCase())

const formatErrandStatus = (status: string) => {
  const result = status?.replace('_', ' ')

  return capitalize(result)
}

const addZeroes = (num: any) =>
  num.toFixed(Math.max((`${num}`.split('.')[1] || '').length, 2))

export default shipmentStatusMap
export {
  escapeRegex,
  shipmentStatusMap,
  deliveryRequestsStatusMap,
  formatErrandStatus,
  addZeroes,
  capitalize,
  formatGraphQlError,
}

export const isMobileApp = () =>
  navigator?.userAgent?.indexOf('errandsdashmobileapp') > -1
