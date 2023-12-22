import moment from 'moment'

const dashDateFormat = 'MMMM D, yyyy'

const fromNow = (
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

const currentDate = () => {
  const date = moment()

  return date.format(dashDateFormat)
}

const isDateSameOrAfter = (
  referenceDate: any,
  secondDate: any,
  useBefore = { days: 1 }
) => {
  let comparedDate = moment().subtract(useBefore)

  if (secondDate) {
    comparedDate = secondDate
  }

  return moment(referenceDate).isSameOrAfter(comparedDate)
}

const formatDate = (dateString: string, format = dashDateFormat) =>
  moment(dateString).format(format)

const calendarFormat = (dateString: string) => {
  const defaultDate = formatDate(dateString, dashDateFormat)

  return moment(dateString).calendar(null, {
    lastDay: '[Yesterday]',
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    nextWeek: 'dddd',
    lastWeek: () => `[${defaultDate}]`,
    sameElse: () => `[${defaultDate}]`,
  })
}

export { fromNow, formatDate, calendarFormat, isDateSameOrAfter, currentDate }
