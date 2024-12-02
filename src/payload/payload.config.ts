import { webpackBundler } from '@payloadcms/bundler-webpack'
import { mongooseAdapter } from '@payloadcms/db-mongodb'

import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload/config'
import rbac from 'payload-rbac'
import cloudinaryPlugin from 'payload-cloudinary-plugin/dist/plugins'

import { Media } from './collections/Media'
import Users from './collections/Users'
import Admins from './collections/Admins'

const m = path.resolve(__dirname, './emptyModuleMock.js')

export default buildConfig({
  admin: {
    disable: true,
    user: Admins.slug,
    bundler: webpackBundler(),
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
  collections: [Admins, Media, Users],
  routes: {
    api: '/api/v1',
  },
  cors: '*', // [process.env.SERVER_URL!, ...process.env.FRONTEND_URLS!.split(',')],
  csrf: [process.env.SERVER_URL!, ...process.env.FRONTEND_URLS!.split(',')],
  editor: lexicalEditor({}),
  // endpoints: [resetDBEndpoint, seedDBEndpoint, clearDBEndpoint],
  // graphQL: {
  //   disablePlaygroundInProduction: false,
  //   schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  // },
  rateLimit: {
    max: 10000, // limit each IP per windowMs
    trustProxy: true,
    window: 2 * 60 * 1000, // 2 minutes
  },
  serverURL: process.env.SERVER_URL!,
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  email: {
    transportOptions: {
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    },
    fromName: 'Edu Tech App',
    fromAddress: process.env.GMAIL_USER,
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
    // schemaOptions: {
    //   strict: false,
    //   strictQuery: false,
    // },
  }),
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
      roles: ['user', 'moderator'], // roles
      defaultRoles: ['user'],
    }),
    cloudinaryPlugin(),
  ],
})
