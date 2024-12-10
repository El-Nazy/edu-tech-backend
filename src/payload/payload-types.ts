/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  collections: {
    admins: Admin;
    media: Media;
    users: User;
    subjects: Subject;
    questions: Question;
    'questions-votes': QuestionsVote;
    responses: Response;
    'responses-replies': ResponsesReply;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  globals: {};
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "admins".
 */
export interface Admin {
  id: string;
  name?: string | null;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: string;
  alt?: string | null;
  addFileNameDate?: boolean | null;
  cloudinary?: {
    public_id?: string | null;
    original_filename?: string | null;
    format?: string | null;
    secure_url?: string | null;
    resource_type?: string | null;
  };
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string;
  emailVerified?: boolean | null;
  emailVerificationHash?: string | null;
  emailVerificationExpiresAt?: string | null;
  picture?: string | Media | null;
  firstName?: string | null;
  lastName?: string | null;
  countryOfResidence?: string | null;
  title?: string | null;
  company?: string | null;
  specialisation?: string | null;
  level?: string | null;
  interests?: (string | Subject)[] | null;
  bio?: string | null;
  roles?: ('user' | 'moderator')[] | null;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "subjects".
 */
export interface Subject {
  id: string;
  name: string;
  description: string;
  followersCount?: number | null;
  creator: string | User;
  image?: string | Media | null;
  firstFiveFollowers?: (string | User)[] | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "questions".
 */
export interface Question {
  id: string;
  asker: string | User;
  subject: string | Subject;
  title?: string | null;
  body: string;
  lastFollowed?: string | null;
  responsesCount?: number | null;
  upVotesCount?: number | null;
  downVotesCount?: number | null;
  userVote?: ('upvote' | 'downvote') | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "questions-votes".
 */
export interface QuestionsVote {
  id: string;
  question: string | Question;
  user: string | User;
  type: 'upvote' | 'downvote';
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "responses".
 */
export interface Response {
  id: string;
  question: string | Question;
  text: string;
  responder: string | User;
  responsesCount?: number | null;
  upVotesCount?: number | null;
  downVotesCount?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "responses-replies".
 */
export interface ResponsesReply {
  id: string;
  text: string;
  media?: string | Media | null;
  responder: string | User;
  parent: string | Response;
  responsesCount?: number | null;
  upVotesCount?: number | null;
  downVotesCount?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: string;
  user:
    | {
        relationTo: 'admins';
        value: string | Admin;
      }
    | {
        relationTo: 'users';
        value: string | User;
      };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: string;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}