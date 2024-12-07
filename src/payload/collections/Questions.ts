import type { CollectionConfig } from 'payload/types'

export const Questions: CollectionConfig = {
  admin: {
    defaultColumns: ['subject', 'asker', 'title', 'responsesCount'],
    useAsTitle: 'subject',
  },
  fields: [
    {
      name: 'subject',
      relationTo: 'subjects',
      required: true,
      type: 'relationship',
    },
    {
      name: 'title',
      required: true,
      type: 'text',
    },
    {
      name: 'body',
      required: true,
      type: 'textarea',
    },
    {
      name: 'asker',
      relationTo: 'users',
      required: true,
      type: 'relationship',
    },
    {
      name: 'lastFollowed',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
      type: 'date',
    },
    {
      name: 'responsesCount',
      admin: {
        readOnly: true,
      },
      defaultValue: 0,
      type: 'number',
    },
    {
      name: 'upVotesCount',
      admin: {
        readOnly: true,
      },
      defaultValue: 0,
      type: 'number',
    },
    {
      name: 'downVotesCount',
      admin: {
        readOnly: true,
      },
      defaultValue: 0,
      type: 'number',
    },
  ],
  slug: 'questions',
}
