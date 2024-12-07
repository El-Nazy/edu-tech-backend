import type { CollectionConfig, PayloadRequest } from 'payload/types'

import type { User } from '../../payload-types'

import usersEndpoints from './endpoints'
import { loginAfterCreate } from './hooks/loginAfterCreate'

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
    tokenExpiration: 60 * 60 * 24 * 30, // 30 days
  },
  endpoints: usersEndpoints,
  fields: [
    {
      name: 'emailVerified',
      defaultValue: false,
      type: 'checkbox',
    },
    {
      name: 'emailVerificationHash',
      hidden: true,
      type: 'text',
    },
    {
      name: 'emailVerificationExpiresAt',
      hidden: true,
      type: 'date',
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
      ({
        doc, // full document data
      }: {
        doc: User
        req: PayloadRequest
      }) => {
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
}

export default Users
