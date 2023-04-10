const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(port, () => console.log(`Twitter app listening on port ${port}!
Press CTRL + C to stop the process.`))