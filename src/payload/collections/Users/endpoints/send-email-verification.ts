import type { Endpoint } from 'payload/config'
import type { PayloadRequest } from 'payload/types'

import { hash } from 'bcryptjs'
import { randomInt } from 'crypto'
import { addMinutes } from 'date-fns'

import formatErr from '../../../../utils/format-err'

export default {
  handler: async (req: PayloadRequest, res) => {
    if (!req.user) {
      return res.status(401).send(formatErr('You must be logged in to perform this action.'))
    }

    const otp = randomInt(100000, 1000000).toString() // random 6 digits int to str

    const unverifedUser = (
      await req.payload.update({
        collection: 'users',
        data: {
          emailVerificationExpiresAt: addMinutes(Date.now(), 10000).toISOString(),
          emailVerificationHash: await hash(otp, Number(process.env.BCRYPT_SALT) || 1),
        },
        where: {
          id: req.user.id,
          emailVerified: { equals: false },
          // and: [{ id: req.user.id }, { emailVerified: false }],
        },
      })
    )?.docs?.[0]

    if (!unverifedUser) {
      return res.status(400).send(formatErr('Email already verified.'))
    }

    // Send email with the confirmation code
    await req.payload.sendEmail({
      html: `<p>Please use the OTP below to confirm your email:</p>
            <p>${otp}</p>`,
      subject: 'Email Verification',
      to: unverifedUser.email,
    })

    res.json({
      message: 'Success',
    })
  },
  method: 'post' as Endpoint['method'],
  path: '/me/send-email-verification',
}
