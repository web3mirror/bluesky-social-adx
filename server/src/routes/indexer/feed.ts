import express from 'express'
import { z } from 'zod'
import { schema } from '@adx/common'
import * as util from '../../util.js'

const router = express.Router()

export const getFeedReq = z.object({
  user: z.string(),
  count: schema.common.strToInt,
  from: schema.repo.strToTid.optional(),
})
export type GetFeedReq = z.infer<typeof getFeedReq>

router.get('/', async (req, res) => {
  const { user, count, from } = util.checkReqBody(req.query, getFeedReq)
  const db = util.getDB(res)
  const feed = await db.retrieveFeed(user, count, from?.toString())
  res.status(200).send(feed)
})

export default router
