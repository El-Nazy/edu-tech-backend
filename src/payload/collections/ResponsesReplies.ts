import type { CollectionConfig } from 'payload/types'

export const ResponsesReplies: CollectionConfig = {
  admin: {
    defaultColumns: ['text', 'responder', 'parent', 'responsesCount'],
  },
  fields: [
    {
      name: 'text',
      required: true,
      type: 'textarea',
    },
    {
      name: 'media',
      relationTo: 'media',
      type: 'upload',
    },
    {
      name: 'responder',
      relationTo: 'users',
      required: true,
      type: 'relationship',
    },
    {
      name: 'parent',
      relationTo: 'responses',
      required: true,
      type: 'relationship',
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
  slug: 'responses-replies',
}
