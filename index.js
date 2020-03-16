const app = require('express')()
const consign = require('consign')
const db = require('./config/db')
const PORT = 3000

app.db = db

consign()
    .include('./config/middlewares.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)


app.listen(PORT, () => {
    console.log('App Runing on port ' + PORT)
})

module.exports = app