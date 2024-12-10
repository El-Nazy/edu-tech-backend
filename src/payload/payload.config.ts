import { webpackBundler } from '@payloadcms/bundler-webpack'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload/config'
import cloudinaryPlugin from 'payload-cloudinary-plugin/dist/plugins'
import rbac from 'payload-rbac'

import Admins from './collections/Admins'
import { Media } from './collections/Media'
import { Questions } from './collections/Questions'
import QuestionsVotes from './collections/QuestionsVotes'
import { Responses } from './collections/Responses'
import { ResponsesReplies } from './collections/ResponsesReplies'
import { Subjects } from './collections/Subjects'
import Users from './collections/Users'

export default buildConfig({
  admin: {
    bundler: webpackBundler(),
    disable: true,
    user: Admins.slug,
  },
  collections: [
    Admins,
    Media,
    Users,
    Subjects,
    Questions,
    QuestionsVotes,
    Responses,
    ResponsesReplies,
  ],
  cors: '*', // [process.env.SERVER_URL!, ...process.env.FRONTEND_URLS!.split(',')],
  csrf: [process.env.SERVER_URL!, ...process.env.FRONTEND_URLS!.split(',')],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
    // schemaOptions: {
    //   strict: false,
    //   strictQuery: false,
    // },
  }),
  editor: lexicalEditor({}),

  email: {
    fromAddress: process.env.GMAIL_USER,
    fromName: 'Edu Tech App',
    transportOptions: {
      auth: {
        pass: process.env.GMAIL_PASSWORD,
        user: process.env.GMAIL_USER,
      },
      service: 'gmail',
    },
  },
  plugins: [
    // swagger({
    //   exclude: {
    //     passwordRecovery: false,
    //     // preferences: true,
    //   },
    // }),
    rbac({
      collections: ['users'], // collections to enable rbac on, default: all auth collections
      defaultRoles: ['user'],
      roles: ['user', 'moderator'], // roles
    }),
    cloudinaryPlugin(),
  ],
  rateLimit: {
    max: 10000, // limit each IP per windowMs
    trustProxy: true,
    window: 2 * 60 * 1000, // 2 minutes
  },
  routes: {
    api: '/api/v1',
  },
  serverURL: process.env.SERVER_URL!,
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
})
