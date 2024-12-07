import type { CollectionConfig } from 'payload/types'

import { email as validateEmail } from 'payload/dist/fields/validations'

import { loginAfterCreate } from './hooks/loginAfterCreate'

const Admins: CollectionConfig = {
  access: {
    admin: ({ req: { user } }) => user.collection === Admins.slug,
    create: () => false,
    delete: () => false,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      // override default email field to add a custom validate function to prevent users from changing the login email
      name: 'email',
      type: 'email',
      validate: validateEmail,
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
  slug: 'admins',
  timestamps: true,
}

export default Admins
