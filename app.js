const express = require('express')
const expressGraphql = require('express-graphql')
const schema = require('./schema')
const app = express()

const port = 4000
const localhost = 'http://localhost:' + port
const html = `
<div style="display: flex; height: 100vh; background: #322f3b;color: #fff;align-items: center; justify-content: center;flex-direction:column ">
  <h1 style="text-align: center;">Hello, Express + GraphQL! </h1>
  <h1 ><a href="/g">Graph<em style="font-family: georgia;">i</em>QL</a></h1>
</div>
`
app.get('/', (req, res) => {
  res.send(html)
})

app.use(
  '/g',
  expressGraphql(() => ({
    schema,
    graphiql: true,
    pretty: true
  }))
)

app.listen(port, () => {
  console.log('server is running in ' + localhost)
})
