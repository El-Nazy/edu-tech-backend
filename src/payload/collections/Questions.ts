import type { Payload } from 'payload'
import type { CollectionConfig, FieldAccess } from 'payload/types'

import { Types } from 'mongoose'
import { blockAll } from 'payload-rbac'

import { Subjects } from './Subjects'

export const Questions: CollectionConfig = {
  admin: {
    defaultColumns: ['subject', 'asker', 'title', 'responsesCount'],
    useAsTitle: 'subject',
  },
  fields: [
    {
      name: 'asker',
      access: {
        create: blockAll() as FieldAccess,
        update: blockAll() as FieldAccess,
      },
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
              collection: Subjects.slug,
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
      access: {
        create: blockAll() as FieldAccess,
        update: blockAll() as FieldAccess,
      },
      admin: {
        readOnly: true,
      },
      type: 'date',
    },
    {
      name: 'responsesCount',
      access: {
        create: blockAll() as FieldAccess,
        update: blockAll() as FieldAccess,
      },
      admin: {
        readOnly: true,
      },
      defaultValue: 0,
      type: 'number',
    },
    {
      name: 'upVotesCount',
      access: {
        create: blockAll() as FieldAccess,
        update: blockAll() as FieldAccess,
      },
      admin: {
        readOnly: true,
      },
      defaultValue: 0,
      type: 'number',
    },
    {
      name: 'downVotesCount',
      access: {
        create: blockAll() as FieldAccess,
        update: blockAll() as FieldAccess,
      },
      admin: {
        readOnly: true,
      },
      defaultValue: 0,
      type: 'number',
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
