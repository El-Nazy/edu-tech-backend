import type { Payload } from 'payload'
import type { CollectionConfig } from 'payload/types'

import { Types } from 'mongoose'

import usersReadonlyAccess from '../../access/users-readonly-access'
import { Subjects } from '../Subjects'
import questionsEndpoints from './endpoints'

export const Questions: CollectionConfig = {
  admin: {
    defaultColumns: ['subject', 'asker', 'title', 'responsesCount'],
    useAsTitle: 'subject',
  },
  endpoints: questionsEndpoints,
  fields: [
    {
      name: 'asker',
      access: usersReadonlyAccess,
      relationTo: 'users',
      required: true,
      type: 'relationship',
    },
    {
      name: 'subject',
      relationTo: 'subjects',
      required: true,
      type: 'relationship',
      validate: async (value, { payload }) => {
        const validationError = 'subject must be a valid subject id'
        if (Types.ObjectId.isValid(value)) {
          return await (payload as Payload)
            .findByID({
              id: value,
              collection: Subjects.slug as 'subjects',
            })
            .then((s) => !!s.id || validationError)
            .catch(() => validationError)
        } else return validationError
      },
    },
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'body',
      required: true,
      type: 'textarea',
    },
    {
      name: 'lastFollowed',
      access: usersReadonlyAccess,
      admin: {
        readOnly: true,
      },
      type: 'date',
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
    {
      name: 'userVote',
      access: {
        create: () => false,
      },
      hidden: true,
      options: [
        {
          label: 'Upvote',
          value: 'upvote',
        },
        {
          label: 'Downvote',
          value: 'downvote',
        },
      ],
      type: 'select',
    },
  ],
  hooks: {
    beforeValidate: [
      ({
        data, // incoming data to update or create with
        operation, // name of the operation ie. 'create', 'update'
        req, // full express request
      }) => {
        if (operation === 'create') data.asker = req.user.id
        return data // Return data to either create or update a document with
      },
    ],
  },
  slug: 'questions',
}
