const express = require('express')
const app = express()
const cors = require('cors')


app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
  ]

app.get('/', (request, response) => {
  response.send('<h1>Hello World, How are you!</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})


app.get('/api/notes/:id', (request, response) => { // Change here
  const id = Number(request.params.id) // Convert the id to a number
  const note = notes.find(note => note.id === id)

  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

//generate a random id first
const generateId = () => {
  const maxId = notes.length > 0
    ?Math.max(...notes.map(note=>Number(note.id)))
    :0
    return(maxId + 1)
  }

app.post('/api/notes',(request,response) => {
  const body = request.body//json parser the data json data into java script object and makes it possible to changes the propertyof object here whcih is not possible with the json formated string 
  if(!body.content) {
    return  response.status(404).json({
        error:'content-missing'
        })
  }
  const note = {
    "content":body.content,
    "important":Boolean(body.important) || false,
    "id":generateId(),
  }
  notes = notes.concat(note)
  response.json(note)

})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})