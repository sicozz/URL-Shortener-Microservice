import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
// Locals
import UrlShortener from './api/urlshortener.route.js'

const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(cors({defaultSucessStatus: 200}))
app.use(express.static("./public/"))

app.get("/", (req, res, next) => {
    res.sendFile(process.cwd() + '/views/index.html')
})
app.use("/api", UrlShortener)
app.use("*", (req, res, next) => {
    res.status(404).json({ error: "Not Found" })
})

export default app
