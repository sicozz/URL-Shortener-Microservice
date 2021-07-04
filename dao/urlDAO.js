import mongodb from 'mongodb'
const ObjectId = mongodb.ObjectID
let urls

export default class UrlDAO {
    static async injectDB(conn) {
        if (urls) {
            return
        }

        try {
            urls = await conn.db(process.env.DB_NS).collection("url_shortener")
        } catch(err) {
            console.log(
                `Unable to establish a connection handle in UrlDAO: ${err}`
            )
        }
    }

    static async addUrl(originalUrl) {
        try {
            new URL(originalUrl)
            const urlDoc = { original_url: originalUrl }
            const insertResponse = await urls.insertOne(urlDoc)
            return {
                original_url: originalUrl,
                short_url: insertResponse.ops[0]._id
            }
        } catch(err) {
            //console.error(err)
            return { error: 'invalid url' }
        }
    }

    static async getUrl(shortUrl) {
        try {
            const searchResponse =
                await urls.findOne({ _id: ObjectId(shortUrl) })
            return searchResponse
        } catch(err) {
            console.log(
                `Unable to correctly find url: ${err}`
            )
        }
    }
}
