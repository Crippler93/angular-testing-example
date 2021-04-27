const express = require('express')

const app = express()

app.get('/api/todos',(req, res) => {
  res.json([
    {
      id: 1,
      name: 'Write unit tests',
      done: false
    },
    {
      id: 2,
      name: 'Push changes',
      done: false
    },
    {
      id: 3,
      name: 'Update documentation',
      done: true
    }
  ])
})

app.listen(3000, () => {
  console.log('server running');
})
