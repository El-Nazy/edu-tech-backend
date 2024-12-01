import type { Access } from 'payload/config'

import { checkRole } from '../collections/Users/checkRole'
import Admins from '../collections/Admins'

export const adminsOrPublished: Access = ({ req: { user } }) => {
  if (user && user.collection === Admins.slug) {
    return true
  }

  return {
    _status: {
      equals: 'published',
    },
  }
}
