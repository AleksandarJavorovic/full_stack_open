const mongoose = require('mongoose')
require('dotenv').config()


const password = process.env.MONGODB_PASSWORD

const url =
`mongodb+srv://aleksandarjavorovic:${password}@cluster0.kmhig.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
})

if (process.argv.length<3) {
  console.log('Give password as argument please!')
  process.exit(1)
} else if (process.argv.length===3) {
  Person.find({}).then(result => {
    console.log('Phonebook:')
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
  // return
} else if (process.argv.length>3) {
  person.save().then(() => {
    console.log(`Added ${person.name}, number: ${person.number} to phonebook!`)
    mongoose.connection.close()
  })
}
