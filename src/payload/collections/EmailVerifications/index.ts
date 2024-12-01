import type { CollectionConfig } from 'payload/types'

import { email as validateEmail } from 'payload/dist/fields/validations'

import { admins } from '../../access/admins'
import { adminEmail } from '../../cron/shared'
import { checkRole } from './checkRole'
import { ensureFirstUserIsAdmin } from './hooks/ensureFirstUserIsAdmin'
import { loginAfterCreate } from './hooks/loginAfterCreate'
import { sanitizeDemoAdmin } from './hooks/sanitizeDemoAdmin'

const EmailVerifications: CollectionConfig = {
  access: {
    create: () => true,
    // delete: () => false,
  },
  // admin: {
  //   defaultColumns: ['name', 'email'],
  //   useAsTitle: 'name',
  // },
  fields: [
    {
      name: 'id',
      required: true,
      type: 'email',
    },
    // {
    //   name: 'email',
    //   type: 'email',
    //   required: true,
    // },
    {
      name: 'codeHash',
      type: 'text',
      hidden: true,
      required: true,
      // access: {
      //   update: () => false,
      //   create: () => false,
      //   read: () => false,
      // },
    },
    // {
    //   // override default email field to add a custom validate function to prevent emailVerifications from changing the login email
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
    // afterChange: [loginAfterCreate],
    beforeOperation: [
      ({
        args, // original arguments passed into the operation
        operation, // name of the operation
        req, // full express request
      }) => {
        console.log('args', args)
        return args
      },
    ],
  },
  slug: 'email-verifications',
  timestamps: true,
}

export default EmailVerifications
