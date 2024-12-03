import { randomInt } from 'crypto'
import { addMinutes, compareAsc } from 'date-fns'
import { PayloadRequest } from 'payload/types'
import formatErr from '../../../../utils/format-err'
import { compare, hash } from 'bcryptjs'
import { Endpoint } from 'payload/config'

export default [
  {
    path: '/me/send-email-verification',
    method: 'post' as Endpoint['method'],
    handler: async (req: PayloadRequest, res) => {
      if (!req.user) {
        return res.status(401).send(formatErr('You must be logged in to perform this action.'))
      }

      const otp = randomInt(100000, 1000000).toString() // random 6 digits int to str
      console.log('*****otp', otp)

      const unverifedUser = (
        await req.payload.update({
          collection: 'users',
          where: {
            id: req.user.id,
            emailVerified: { equals: false },
            // and: [{ id: req.user.id }, { emailVerified: false }],
          },
          data: {
            emailVerificationHash: await hash(otp, Number(process.env.BCRYPT_SALT) || 1),
            emailVerificationExpiresAt: addMinutes(Date.now(), 10000).toISOString(),
          },
        })
      )?.docs?.[0]

      if (!unverifedUser) {
        return res.status(400).send(formatErr('Email already verified.'))
      }

      // Send email with the confirmation code
      await req.payload.sendEmail({
        to: unverifedUser.email,
        subject: 'Email Verification',
        html: `<p>Please use the OTP below to confirm your email:</p>
            <p>${otp}</p>`,
      })

      res.json({
        message: 'Success',
      })
    },
  },

  {
    path: '/me/verify-email',
    method: 'post' as Endpoint['method'],
    handler: async (req: PayloadRequest, res) => {
      if (!req.user) {
        return res.status(401).send(formatErr('You must be logged in to perform this action.'))
      }

      const currentUser = await await req.payload.db.collections['users'].findById(req.user.id)

      console.log('curr user', currentUser)

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
            emailVerificationHash: true,
            emailVerificationExpiresAt: true,
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
  },
]
