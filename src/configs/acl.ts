import { AbilityBuilder, Ability } from '@casl/ability'
import { UserDataType } from '@context/utils'
import {
  senderPages,
  senderAbilities,
  verifiedCarrierPages,
  unVerifiedCarrierPages,
  verifiedCarrierAbilities,
  unVerifiedCarrierAbilities,
} from './page-abilities'

export type Subjects = string
export type Actions = 'do' | 'read'

export type AppAbility = Ability<[Actions, Subjects]> | undefined

export const AppAbility = Ability as any
export type ACLObj = {
  action: Actions
  subject: string
}

/**
 * Please define your own Ability rules according to your app requirements.
 * We have just shown Admin and Client rules for demo purpose where
 * admin can manage everything and client can just visit ACL page
 */
const defineRulesFor = (user: UserDataType, subject: string) => {
  const { role, verified } = user
  const { can, rules } = new AbilityBuilder(AppAbility)

  debugger
  if (role === 'sender') {
    can(['read'], senderPages)
    can(['do'], senderAbilities)
  } else if (role === 'carrier') {
    if (verified) {
      can(['read'], verifiedCarrierPages)
      can(['do'], verifiedCarrierAbilities)
    } else {
      can(['read'], unVerifiedCarrierPages)
      can(['do'], unVerifiedCarrierAbilities)
    }
  } else {
    can(['read', 'do'], subject)
  }

  return rules
}

export const buildAbilityFor = (
  user: UserDataType | null,
  subject: string
): AppAbility => {
  debugger
  if (!user) return

  return new AppAbility(defineRulesFor(user, subject), {
    // https://casl.js.org/v5/en/guide/subject-type-detection
    // @ts-ignore
    detectSubjectType: (object) => object!.type,
  })
}

export const defaultACLObj: ACLObj = {
  action: 'do',
  subject: 'nothing',
}

export default defineRulesFor
