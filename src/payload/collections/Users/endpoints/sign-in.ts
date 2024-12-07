import Users from '..'

export default {
  handler: async (req, res) =>
    res.send(
      await req.payload.login({
        collection: Users.slug as 'users',
        data: req.body,
        req: req,
        res: res,
      }),
    ),
  method: 'post',
  path: '/sign-in',
}
