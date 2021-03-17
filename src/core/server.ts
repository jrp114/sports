const express = require('express')

const app = express()
const port = 8080
app.listen(port, () => {
    console.log(`service started on http://localhost:${port}`)
})

type Request = typeof express.Request
type Response = typeof express.Response
export { app, Request, Response }