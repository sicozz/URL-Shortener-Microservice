import UrlDAO from '../dao/urlDAO.js'

export default class UrlCtrl {
    static async apiPostShortUrl(req, res, next) {
        const originalUrl = req.body.url
        console.log(originalUrl)
        const addResponse = await UrlDAO.addUrl(originalUrl)
        if (addResponse.error) {
            //res.status(400).json(addResponse)
            res.json(addResponse)
        } else {
            res.json(addResponse)
        }
    }

    static async apiGetShortUrl(req, res, next) {
        const shortUrl = req.params.shorturl
        const getResponse = await UrlDAO.getUrl(shortUrl)
        if (getResponse.error) {
            //res.status(400).json(getResponse)
            res.json(getResponse)
        } else {
            res.redirect(getResponse.original_url)
        }
    }
}
