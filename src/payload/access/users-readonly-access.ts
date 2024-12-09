import type { FieldAccess } from 'payload/types'

import { blockAll } from 'payload-rbac'

export default {
  create: blockAll() as FieldAccess,
  update: blockAll() as FieldAccess,
}
