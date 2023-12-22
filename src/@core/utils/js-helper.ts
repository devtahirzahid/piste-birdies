import moment from 'moment'

const dashDateFormat = 'MMMM D, yyyy'

export const toTitleCase = (word: string | undefined) => {
  if (word) {
    return word
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }
}

export const isEmptyObject = (obj: any | null) => {
  return obj && Object.keys(obj).length === 0
}

export const formatDate = (dateString: string, format = dashDateFormat) =>
  moment(dateString).format(format)

export const fromNow = (
  dateString: string,
  options = { useBefore: null, format: '', prefix: '', suffix: '' }
) => {
  const date = moment(dateString)
  const past = moment().subtract(options.useBefore || { months: 1 })

  if (moment(date).isSameOrAfter(past)) {
    return date.fromNow()
  }

  let result = date.format(options.format || dashDateFormat)

  if (options.prefix) {
    result = `${options.prefix} ${result}`
  }

  if (options.suffix) {
    result += ` ${options.suffix}`
  }

  return result
}
