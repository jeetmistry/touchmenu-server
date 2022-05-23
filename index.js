
require('dotenv').config()
const express = require('express')
const app = express()
var cors = require('cors')
const port = process.env.PORT || 4000

const connect = require('./config/db')
connect()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use("/restaurant",require("../server/components/routes/Restaurant"));
app.use("/menu",require("../server/components/routes/Menu"));
app.use("/cart",require("../server/components/routes/Cart"));
app.use("/order",require("../server/components/routes/Orders"));
app.use("/sentiment",require("../server/components/routes/Review"));
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`)
  })