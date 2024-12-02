import type { CollectionConfig, PayloadRequest } from 'payload/types'

import { email as validateEmail } from 'payload/dist/fields/validations'

import { loginAfterCreate } from './hooks/loginAfterCreate'
import { addMinutes } from 'date-fns'
import { User } from '../../payload-types'
import payload from 'payload'

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
        payload.logger.info(`req body ${JSON.stringify(req.body)}`, req.body)
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
      access: {
        read: () => false,
      },
    },
    {
      name: 'emailVerificationExpiresAt',
      type: 'date',
      // defaultValue: () => addMinutes(new Date(), 1),
      hidden: true,
      access: {
        read: () => false,
      },
      hooks: {},
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
  },
  slug: 'users',
  timestamps: true,
}

export default Users
