import type { CollectionConfig } from 'payload/types'

export default {
  admin: {
    defaultColumns: ['question', 'user', 'type'],
  },
  fields: [
    {
      name: 'question',
      relationTo: 'questions',
      required: true,
      type: 'relationship',
    },
    {
      name: 'user',
      relationTo: 'users',
      required: true,
      type: 'relationship',
    },
    {
      name: 'type',
      options: [
        {
          label: 'Upvote',
          value: 'upvote',
        },
        {
          label: 'Downvote',
          value: 'downvote',
        },
      ],
      required: true,
      type: 'select',
    },
  ],
  //   hooks: {
  //     afterChange: [
  //       async ({ doc, operation, req }) => {
  //         // Update vote counts in the questions collection
  //         if (operation === 'create' || operation === 'delete') {
  //           const { payload } = req
  //           const questionId = doc.question

  //           // Count upvotes and downvotes
  //           const upvotesCount = await payload.find({
  //             collection: 'questions-votes',
  //             where: {
  //               question: { equals: questionId },
  //               type: { equals: 'upvote' },
  //             },
  //           })

  //           const downvotesCount = await payload.find({
  //             collection: 'questions-votes',
  //             where: {
  //               question: { equals: questionId },
  //               type: { equals: 'downvote' },
  //             },
  //           })

  //           // Update the question with new vote counts
  //           await payload.update({
  //             id: questionId,
  //             collection: 'questions',
  //             data: {
  //               downVotesCount: downvotesCount.totalDocs,
  //               upVotesCount: upvotesCount.totalDocs,
  //             },
  //           })
  //         }
  //       },
  //     ],
  //   },
  slug: 'questions-votes',
} as CollectionConfig

// // Update Questions collection to include vote-related virtual fields
// export const Questions: CollectionConfig = {
//   // ... other existing fields
//   fields: [
//     // ... other existing fields
//     {
//       name: 'userVote',
//       admin: {
//         description: "Current user's vote on this question",
//         hidden: true,
//       },
//       hooks: {
//         beforeChange: [
//           ({ value }) => value, // Prevent modifying this field directly
//         ],
//       },
//       type: 'text',
//     },
//   ],
// }
