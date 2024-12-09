import type { CollectionConfig } from 'payload/types'

import { Types } from 'mongoose'

import usersReadonlyAccess from '../../access/users-readonly-access'
import adminOrCreator from './access/admin-or-creator'
import subjectsEndpoints from './endpoints'

export const Subjects: CollectionConfig = {
  access: {
    update: adminOrCreator,
  },
  admin: {
    defaultColumns: ['name', 'creator', 'followersCount'],
    useAsTitle: 'name',
  },
  endpoints: subjectsEndpoints,
  fields: [
    {
      name: 'name',
      required: true,
      type: 'text',
    },
    {
      name: 'description',
      required: true,
      type: 'text',
    },
    {
      name: 'followersCount',
      defaultValue: 0,
      type: 'number',
    },
    {
      name: 'creator',
      hooks: {
        beforeValidate: [
          ({ req }) => {
            return req.user.id
          },
        ],
      },
      relationTo: 'users',
      required: true,
      type: 'relationship',
    },
    {
      name: 'image',
      hooks: {
        beforeValidate: [
          ({ value }) => {
            if (!Types.ObjectId.isValid(value)) return null
          },
        ],
      },
      relationTo: 'media',
      type: 'upload',
    },
    {
      name: 'firstFiveFollowers',
      access: usersReadonlyAccess,
      defaultValue: ({ user }) => {
        return [user.id]
      },
      hasMany: true,
      maxRows: 5,
      relationTo: 'users',
      type: 'relationship',
    },
  ],
  slug: 'subjects',
}
