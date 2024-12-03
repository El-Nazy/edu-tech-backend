import type { CollectionConfig, PayloadRequest } from 'payload/types'

import { loginAfterCreate } from './hooks/loginAfterCreate'
import { User } from '../../payload-types'

import emailVerificationEndpoints from './endpoints/email-verification-endpoints'

const Users: CollectionConfig = {
  access: {
    create: () => true,
    delete: () => false,
  },
  admin: {
    defaultColumns: ['firstName', 'email'],
    useAsTitle: 'firstName',
  },
  auth: {
    tokenExpiration: 100000000,
    forgotPassword: {
      generateEmailHTML: ({
        req,
        token,
        user,
      }: {
        req: PayloadRequest
        token: string
        user: User
      }) => {
        // Use the token provided to allow your user to reset their password
        const resetPasswordURL = `${req.body.redirect || 'https://localhost:3000/reset-password'}?token=${token}`

        return `
        <!doctype html>
        <html>
          <body>
            <p>Hello, ${(user.firstName && user.lastName && user.firstName + ' ' + user.lastName) || user.firstName || user.lastName || user.email}</p>
            <p>Click below to reset your password.</p>
            <p>
              <a href="${resetPasswordURL}">${resetPasswordURL}</a>
            </p>
          </body>
        </html>
      `
      },
    },
  },
  fields: [
    {
      name: 'emailVerified',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'emailVerificationHash',
      type: 'text',
      hidden: true,
    },
    {
      name: 'emailVerificationExpiresAt',
      type: 'date',
      hidden: true,
    },
    {
      name: 'picture',
      type: 'text',
    },
    {
      name: 'firstName',
      type: 'text',
    },
    {
      name: 'lastName',
      type: 'text',
    },
    {
      name: 'countryOfResidence',
      type: 'text',
    },
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'company',
      type: 'text',
    },
    {
      name: 'specialisation',
      type: 'text',
    },
    {
      name: 'level',
      type: 'text',
    },
    {
      name: 'interests',
      type: 'text',
    },
    {
      name: 'bio',
      type: 'text',
    },
    // {
    //   name: 'roles',
    //   access: {
    //     create: admins,
    //     read: admins,
    //     update: admins,
    //   },
    //   defaultValue: ['user'],
    //   hasMany: true,
    //   hooks: {
    //     beforeChange: [ensureFirstUserIsAdmin],
    //   },
    //   options: [
    //     {
    //       label: 'admin',
    //       value: 'admin',
    //     },
    //     {
    //       label: 'user',
    //       value: 'user',
    //     },
    //   ],
    //   type: 'select',
    // },
  ],
  hooks: {
    afterChange: [loginAfterCreate],
    afterRead: [
      async ({
        doc, // full document data
        req, // full express request
      }: {
        doc: User
        req: PayloadRequest
      }) => {
        // console.log('req user', req.user, doc)
        // if (req.user.collection !== 'admins' || req.user.id !== doc.id) {
        //   // delete doc.loginAttempts
        // }
        delete doc.loginAttempts
        return doc
      },
    ],
  },
  slug: 'users',
  timestamps: true,
  endpoints: [
    {
      path: '/sign-in',
      method: 'post',
      handler: async (req, res) =>
        res.send(
          await req.payload.login({
            collection: Users.slug as 'users',
            req: req as PayloadRequest,
            data: req.body,
            res: res,
          }),
        ),
    },
    ...emailVerificationEndpoints,
  ],
}

export default Users
