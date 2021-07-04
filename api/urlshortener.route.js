import express from 'express'
import UrlCtrl from './urlshortener.controller.js'

const router = express.Router()

router.route("/shorturl").post(UrlCtrl.apiPostShortUrl)
router.route("/shorturl/:shorturl").get(UrlCtrl.apiGetShortUrl)

export default router
