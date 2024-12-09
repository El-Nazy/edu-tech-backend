import type { CollectionConfig } from 'payload/types'

import usersReadonlyAccess from '../access/users-readonly-access'
import { Questions } from './Questions'

export const Responses: CollectionConfig = {
  admin: {
    defaultColumns: ['text', 'responder', 'responsesCount'],
  },
  fields: [
    {
      name: 'question',
      relationTo: Questions.slug,
      required: true,
      type: 'relationship',
    },
    {
      name: 'text',
      required: true,
      type: 'textarea',
    },
    // {
    //   // name: 'media',
    //   // hasMany: true,
    //   // relationTo: 'media',
    //   // type: 'upload',
    // },
    {
      name: 'responder',
      access: usersReadonlyAccess,
      relationTo: 'users',
      required: true,
      type: 'relationship',
    },
    {
      name: 'responsesCount',
      access: usersReadonlyAccess,
      admin: {
        readOnly: true,
      },
      defaultValue: 0,
      type: 'number',
    },
    {
      name: 'upVotesCount',
      access: usersReadonlyAccess,
      admin: {
        readOnly: true,
      },
      defaultValue: 0,
      type: 'number',
    },
    {
      name: 'downVotesCount',
      access: usersReadonlyAccess,
      admin: {
        readOnly: true,
      },
      defaultValue: 0,
      type: 'number',
    },
  ],
  slug: 'responses',
}
