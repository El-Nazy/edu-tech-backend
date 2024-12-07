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
import { Responses } from './collections/Responses'
import { ResponsesReplies } from './collections/ResponsesReplies'
import { Subjects } from './collections/Subjects'
import Users from './collections/Users'

const m = path.resolve(__dirname, './emptyModuleMock.js')

export default buildConfig({
  admin: {
    bundler: webpackBundler(),
    disable: true,
    user: Admins.slug,
    webpack: (config) => ({
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          express: m,
          [path.resolve(__dirname, './cron/reset')]: m,
        },
      },
    }),
  },
  collections: [Admins, Media, Users, Subjects, Questions, Responses, ResponsesReplies],
  cors: '*', // [process.env.SERVER_URL!, ...process.env.FRONTEND_URLS!.split(',')],
  csrf: [process.env.SERVER_URL!, ...process.env.FRONTEND_URLS!.split(',')],
  editor: lexicalEditor({}),
  routes: {
    api: '/api/v1',
  },
  // endpoints: [resetDBEndpoint, seedDBEndpoint, clearDBEndpoint],
  // graphQL: {
  //   disablePlaygroundInProduction: false,
  //   schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  // },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
    // schemaOptions: {
    //   strict: false,
    //   strictQuery: false,
    // },
  }),
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
  rateLimit: {
    max: 10000, // limit each IP per windowMs
    trustProxy: true,
    window: 2 * 60 * 1000, // 2 minutes
  },
  serverURL: process.env.SERVER_URL!,
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  // graphQL: {

  // },
  plugins: [
    // formBuilder({}),
    // redirects({
    //   collections: ['pages', 'posts'],
    // }),
    // nestedDocs({
    //   collections: ['categories'],
    // }),
    // seo({
    //   collections: ['pages', 'posts', 'projects'],
    //   generateTitle,
    //   uploadsCollection: 'media',
    // }),
    // payloadCloud(),
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
})
