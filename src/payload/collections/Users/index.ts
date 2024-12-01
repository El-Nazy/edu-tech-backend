import type { CollectionConfig } from 'payload/types'

import { email as validateEmail } from 'payload/dist/fields/validations'

import { admins } from '../../access/admins'
import { adminEmail } from '../../cron/shared'
import { checkRole } from './checkRole'
import { ensureFirstUserIsAdmin } from './hooks/ensureFirstUserIsAdmin'
import { loginAfterCreate } from './hooks/loginAfterCreate'
import { sanitizeDemoAdmin } from './hooks/sanitizeDemoAdmin'
import { addMinutes } from 'date-fns'

const Users: CollectionConfig = {
  access: {
    create: () => true,
    delete: () => false,
  },
  // admin: {
  //   defaultColumns: ['name', 'email'],
  //   useAsTitle: 'name',
  // },
  auth: true,
  fields: [
    {
      name: 'emailVerified',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'emailVerificationHash',
      type: 'text',
      defaultValue: 'test def val',
      hidden: true,
    },
    {
      name: 'emailVerificationExpiresAt',
      type: 'date',
      defaultValue: () => addMinutes(new Date(), 1),
      hidden: true,
    },
    {
      name: 'name',
      type: 'text',
    },
    // {
    //   // override default email field to add a custom validate function to prevent users from changing the login email
    //   name: 'email',
    //   type: 'email',
    //   validate: (value, args) => {
    //     if (args?.user?.email === adminEmail && value !== adminEmail) {
    //       return 'You cannot change the admin password on the public demo!'
    //     }
    //     // call the payload default email validation
    //     return validateEmail(value, args)
    //   },
    // },
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
    // beforeOperation: [sanitizeDemoAdmin],
  },
  slug: 'users',
  timestamps: true,
}

export default Users
