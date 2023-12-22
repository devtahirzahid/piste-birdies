// ** React Imports
import { ReactNode, ReactElement, useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Hooks Import
import { useAuth } from '@hooks/useAuth'

interface GuestGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const GuestGuard = (props: GuestGuardProps) => {
  const { children, fallback } = props
  const auth = useAuth()
  const router = useRouter()
  const guestAndUserPaths = ['/confirm-email/[token]']

  //@ts-ignore
  const userAllowed = !guestAndUserPaths.includes[router.pathname]

  const { user } = auth

  useEffect(() => {
    if (!router.isReady) {
      return
    }

    if (user) {
      router.replace('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.route])

  if (auth.loading || (!auth.loading && user && !userAllowed)) {
    return fallback
  }

  return <>{children}</>
}

export default GuestGuard
