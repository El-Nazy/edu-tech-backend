import type { Endpoint } from 'payload/config'

import { equal } from 'assert'

import type { Question, Subject, User } from '../../../payload-types'

export default {
  handler: async (req, res) => {
    const vote = await req.payload.create({
      collection: 'questions-votes',
      data: {
        question: req.params.id,
        type: req.body?.type,
        user: req.user.id,
      },
      req,
      // where: {
      //   user: {equal: req.user.id}
      // },
      ...req.query,
      depth: 1,
    })

    ;(vote.question as Question).userVote = req.body?.type

    res.json(vote.question)
  },
  method: 'post',
  path: '/:id/vote',
} as Endpoint
