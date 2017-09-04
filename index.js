require('dotenv').config()
const app = require('./src/app')
const { env } = require('./src/utils')

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`listening on port ${port}, running on ${env} mode`))
