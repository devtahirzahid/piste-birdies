import { toast } from 'react-hot-toast'

type ErrorHandlerProps = {
  error: any
  silent: boolean
  queryName?: string
  errorCallback?: () => void
}

export const errorHandler = ({
  error,
  silent = false,
  queryName,
  errorCallback,
}: ErrorHandlerProps) => {
  localStorage.setItem(`apiError`, `${queryName} - ${JSON.stringify(error)}`)
  if (errorCallback) {
    errorCallback()
  }

  if (!silent) {
    toast.error(
      error.message?.replace('GraphQL error:', '') || 'Error occurred'
    )
  }
}
