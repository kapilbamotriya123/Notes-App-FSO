const express= require("express")
const morgan = require("morgan")
const app = express()


app.use(express.json())

morgan.token(`body`,(request) => JSON.stringify(request.body))
const customFormat = ':method :url :status :res[content-length] - :response-time ms :body';
app.use(morgan(customFormat))
let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const generateId = () => {
    const maxId = persons.length > 0
        ?Math.max(...persons.map(person=>Number(person.id)))
        :0
    console.log("this is maxid: ",maxId) 
    return (maxId + 1)
}
``
app.get('/api/persons',(request,response) => {
    response.json(persons)
})

app.get('/api/persons/:id',(request,response)=> {
    const id = request.params.id
    console.log(id)
    const person = persons.find(person=>person.id===id)
    if(!person) {
        response.status(404).end()
    }
    response.json(person)
})

app.get('/info',(request,response) =>{navigator
    response.send(
        `<p>The phonebook has ${persons.length} people</p>
        <br/>
        ${Date()}
    `)
})

app.delete('/api/persons/:id',(request,response)=> {
    const id = request.params.id
    persons = persons.filter(person=>person.id!==id)
    response.status(204).end(  )

})

app.post('/api/persons',(request,response) => {
    const body = request.body
    if(!body.name) {
        response.status(404).json({
            error:'name missing'
        })
    }
    const name = body.name

    persons.forEach(person => {
        if(person.name === name) {
            response.status(404).end({
                error:"Name already exist"
            })
        }         
    });



    if(!body.number) {
        response.status(404).json({
            error:'number missing'
        })
    }
    const person = {
        "id": String(generateId()),
        "name":body.name,
        "number":body.number,
    }

    persons = persons.concat(person)
    console.log(persons)
    response.json(person)
})
const PORT = 3001
app.listen(PORT,()=> {
    console.log(`app running on ${PORT}`)
})
