import { webpackBundler } from '@payloadcms/bundler-webpack'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import type { GenerateTitle } from '@payloadcms/plugin-seo/types'

import { payloadCloud } from '@payloadcms/plugin-cloud'
// import formBuilder from '@payloadcms/plugin-form-builder'
import nestedDocs from '@payloadcms/plugin-nested-docs'
import redirects from '@payloadcms/plugin-redirects'
import seo from '@payloadcms/plugin-seo'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload/config'
import { swagger } from 'payload-swagger'
import rbac from 'payload-rbac'

import Categories from './collections/Categories'
import Comments from './collections/Comments'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Projects } from './collections/Projects'
import Users from './collections/Users'
import { clearDBEndpoint, resetDBEndpoint, seedDBEndpoint } from './endpoints/resetDB'
import { Footer } from './globals/Footer'
import { Header } from './globals/Header'
import { Settings } from './globals/Settings'
import Admins from './collections/Admins'

const generateTitle: GenerateTitle = () => {
  return 'Payload Public Demo'
}

const m = path.resolve(__dirname, './emptyModuleMock.js')

export default buildConfig({
  admin: {
    disable: true,
    user: Admins.slug,
    autoLogin: {
      email: 'demo@payloadcms.com',
      password: 'demo',
      prefillOnly: true,
    },
    bundler: webpackBundler(),
    livePreview: {
      breakpoints: [
        {
          name: 'mobile',
          height: 667,
          label: 'Mobile',
          width: 375,
        },
      ],
    },
    // user: Users.slug,
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
  collections: [
    Admins,
    // Pages,
    // Posts,
    // Projects,
    Media,
    // Categories,
    Users,
    // Comments,
  ],
  routes: {
    api: '/api/v1',
  },
  cors: [process.env.PAYLOAD_PUBLIC_SERVER_URL!],
  csrf: [process.env.PAYLOAD_PUBLIC_SERVER_URL!],
  editor: lexicalEditor({}),
  // endpoints: [resetDBEndpoint, seedDBEndpoint, clearDBEndpoint],
  // globals: [Settings, Header, Footer],
  // graphQL: {
  //   disablePlaygroundInProduction: false,
  //   schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  // },
  rateLimit: {
    max: 10000, // limit each IP per windowMs
    trustProxy: true,
    window: 2 * 60 * 1000, // 2 minutes
  },
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL!,
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
  }),
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
  ],
})
