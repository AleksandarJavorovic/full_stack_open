require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const Person = require('./models/person')
const cors = require('cors')

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(cors())
app.use(express.static('dist'))

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

morgan.token('person-info', (req) => {
  const id = req.params.id;

  if (id) {
    const person = persons.find(p => p.id === id);
    return person ? JSON.stringify({ name: person.name, number: person.number }) : 'Person not found';
  }

  return JSON.stringify(persons.map(({ name, number }) => ({ name, number })));
});

app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person-info'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/info', (request, response) => {
    const date = new Date()
    Person.countDocuments()
        .then(count => {
            response.send(`Phonebook has info for ${count} people.<br/><br/>${date}`)
        })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
  .then(result => {
    if (result) {
      response.json(result)
    } else {
      response.status(404).json({ error: 'Person not found' })
    }
  })
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
  .then(result => {
    if (result) {
      response.status(204).end()
    } else {
      response.status(404).json({ error: 'Person not found' })
    }
  })
  .catch(error => next(error))
})


const generateId = () => {
    return String(Math.floor(Math.random() * 1000000));
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({ 
          error: 'name or number is missing' 
        })
    }
  
    const person = new Person({
      name: body.name,
      number: body.number,
    })
  
    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true }
  )
    .then(updatedPerson => {
      updatedPerson 
        ? response.json(updatedPerson) 
        : response.status(404).end()
    })
    .catch(error => next(error))
})


app.use(errorHandler)
  

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})