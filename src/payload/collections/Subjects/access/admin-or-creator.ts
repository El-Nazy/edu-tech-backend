import type { Access } from 'payload/config'

import Admins from '../../Admins'

export default (({ data, req }) =>
  req.user.collection === Admins.slug || req.user.id === data.creator) as Access
