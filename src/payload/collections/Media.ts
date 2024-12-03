import type { CollectionConfig, PayloadRequest } from 'payload/types'

import { LinkFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'

export const Media: CollectionConfig = {
  access: {
    create: ({ req }: { req: PayloadRequest }) => !!req.user,
    delete: () => false,
    read: () => true,
    update: () => false,
  },
  admin: {
    description: 'Creating, updating, and deleting media is disabled for this demo.',
  },
  fields: [
    {
      name: 'alt',
      // required: true,
      type: 'text',
    },
    {
      name: 'addFileNameDate',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
  slug: 'media',
  upload: {
    disableLocalStorage: true,
    staticURL: '/media',
    // staticURL: "",
    // staticOptions:
    // staticDir: path.resolve(__dirname, '../../../media'),
  },
}
