import type { Endpoint } from 'payload/config'

import sendEmailVerification from './send-email-verification'
import signIn from './sign-in'
import verifyEmail from './verify-email'

export default [signIn, sendEmailVerification, verifyEmail] as Endpoint[]
