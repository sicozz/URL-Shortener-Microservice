import mongodb from 'mongodb'
import dotenv from 'dotenv'
// Locals
import app from './server.js'
import UrlDAO from './dao/urlDAO.js'
dotenv.config()

const port = process.env.PORT || 8000
const MongoClient = mongodb.MongoClient

MongoClient.connect(
    process.env.DB_URI,
    {
        poolSize: 50,
        wtimeout: 2500,
        useNewUrlParse: true
    }
)
    .catch(err => {
        console.error(err.stack)
        process.exit(1)
    })
    .then(async client => {
        await UrlDAO.injectDB(client)
        var listener = app.listen(port, () => {
            console.log(`listening on port: ${listener.address().port}`)
        })
    })
