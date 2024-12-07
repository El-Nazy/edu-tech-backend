import type { Access } from 'payload/types'

import Admins from '../../Admins'

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
