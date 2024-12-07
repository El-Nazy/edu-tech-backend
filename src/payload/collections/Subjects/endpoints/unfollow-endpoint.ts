import type { Endpoint } from 'payload/config'

export default {
  handler: async (req, res) => {
    // req.payload.db.collections['users'].
    // const tracking = await getTrackingInfo(req.params.id)
    // if (tracking) {
    //   res.status(200).send({ tracking })
    // } else {
    //   res.status(404).send({ error: 'not found' })
    // }
  },
  method: 'post',
  path: '/:id/unfollow',
} as Endpoint
