// ** React Imports
import React, { ReactNode, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Types
import type { ACLObj, AppAbility } from '@configs/acl'

// ** Context Imports

// ** Config Import
import { buildAbilityFor } from '@configs/acl'

// ** Component Import
import NotAuthorized from 'src/pages/401'
import BlankLayout from '@compCore/layouts/BlankLayout'

// ** Hooks
import { useAuth } from '@hooks/useAuth'
import { isEmptyObject } from '../../utils/js-helper'
import { AbilityContext } from '@compCore/layouts/components/acl/Can'

interface AclGuardProps {
  children: ReactNode
  guestGuard: boolean
  aclAbilities: ACLObj
}

const AclGuard = (props: AclGuardProps) => {
  // ** Props
  const { aclAbilities, children, guestGuard } = props

  const [ability, setAbility] = useState<AppAbility | undefined>(undefined)

  // ** Hooks
  const { user } = useAuth()
  const router = useRouter()

  // If guestGuard is true and user is not logged in or its an error page, render the page without checking access
  if (guestGuard || router.route === '/404' || router.route === '/500' || router.route === '/') {
    return <>{children}</>
  }

  // User is logged in, build ability for the user based on his role
  if (!isEmptyObject(user) && !ability) {
    setAbility(buildAbilityFor(user, aclAbilities.subject))
  }

  // Check the access of current user and render pages
  if (ability && ability.can(aclAbilities.action, aclAbilities.subject)) {
    return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
  }

  // Render Not Authorized component if the current user has limited access
  return (
    <BlankLayout>
      <NotAuthorized />
    </BlankLayout>
  )
}

export default AclGuard
