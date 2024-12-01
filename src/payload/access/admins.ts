import type { AccessArgs } from 'payload/config'

import type { User } from '../payload-types'

import { checkRole } from '../collections/Users/checkRole'
import Admins from '../collections/Admins'

type isAdmin = (args: AccessArgs<unknown, User>) => boolean

export const admins: isAdmin = ({ req: { user } }) => {
  // return checkRole(['admin'], user.collection)
  return user.collection === Admins.slug
}
