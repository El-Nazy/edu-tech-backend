import type { Access } from 'payload/types'

import { checkRole } from '../checkRole'
import Admins from '..'

const adminsAndUser: Access = ({ req: { user } }) => {
  if (user) {
    if (user.collection === Admins.slug) {
      return true
    }

    return {
      id: {
        equals: user.id,
      },
    }
  }

  return false
}

export default adminsAndUser
