import type { Endpoint } from 'payload/config'

import type { Subject, User } from '../../../payload-types'

export default {
  handler: async (req, res) => {
    let userInterests
    if (typeof req.user?.interests?.[0]?.id === 'string') {
      userInterests = ((req.user as User).interests as Subject[]).map((i) => i.id)
    } else {
      userInterests = req.user.interests as string[]
    }

    const questions = await req.payload.find({
      collection: 'questions',
      req,
      where: {
        subject: {
          in: userInterests,
        },
      },
      ...req.query,
    })

    res.json(questions)
  },
  method: 'get',
  path: '/for-me',
} as Endpoint
