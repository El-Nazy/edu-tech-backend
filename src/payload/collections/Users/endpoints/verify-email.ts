import type { Endpoint } from 'payload/config'
import type { PayloadRequest } from 'payload/types'

import { compare } from 'bcryptjs'
import { compareAsc } from 'date-fns'

import formatErr from '../../../../utils/format-err'

export default {
  handler: async (req: PayloadRequest, res) => {
    if (!req.user) {
      return res.status(401).send(formatErr('You must be logged in to perform this action.'))
    }

    const currentUser = await await req.payload.db.collections['users'].findById(req.user.id)

    if (compareAsc(new Date(currentUser.emailVerificationExpiresAt), Date.now()) === -1) {
      return res.json({
        message: 'Code expired.',
        verified: false,
      })
    }

    if (!req.body.code) {
      return res.status(400).send(formatErr('You must provide a verification code.'))
    }

    if (!(await compare(req.body.code, currentUser.emailVerificationHash))) {
      return res.json({
        message: 'Invalid code.',
        verified: false,
      })
    }

    await req.payload.db.collections['users'].findByIdAndUpdate(
      currentUser.id,
      {
        $set: {
          emailVerified: true,
        },
        $unset: {
          emailVerificationExpiresAt: true,
          emailVerificationHash: true,
        },
      },
      {
        new: true,
      },
    )

    return res.json({
      message: 'Email verified.',
      verified: true,
    })
  },
  method: 'post' as Endpoint['method'],
  path: '/me/verify-email',
}
