import { useState, useEffect } from 'react'
import NameFilter from './components/NameFilter'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'
// import axios from 'axios'
import personService from './services/persons'

const App = (props) => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setNewSearchName] = useState('')
  const [showAll, setShowAll] = useState(true)
  // const [deletePerson, deleteAPerson] = useState(false)

  useEffect(() => {
    console.log('use effect!')
   
    personService.getAll()
      .then(data => {
        console.log('promise filled with data', data)
        setPersons(data)
      })
  }, [])

  // const handleDeletion = (id) => {
  //   const person = persons.find(n => n.id === id)
  //   console.log('delete person with ID', [id, person])
  // }

  const handleNameChange = (event) => {
    console.log('handleNameChange', event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log('handleNumberChange', event.target.value)
    setNewNumber(event.target.value)
  }
  const handleSearchNameChange = (event) => {
    console.log('handleSearchNameChange', event.target.value)
    setNewSearchName(event.target.value)
  }

  // const handleDeletion = (event) => {
  //   console.log('handleDeletion', event.target.value)
  //   deleteAPerson(event.target.value)
  // }

  const addPerson = (event) => {
    event.preventDefault()
    console.log('submit form', event.target)
    console.log('persons', persons)
    console.log('persons.some', persons.some(element => element.name === newName))
    console.log('newName', newName)
    if (persons.some(person => person.name === newName)) {
      if (persons.find(person => person.name === newName).number !== newNumber) {
        triggerUpdate(persons.find(person => person.name === newName).id, newNumber)
      } else {
        alert(`${newName} is already added to phonebook!`)
      }
      return
    }

    if (persons.some(person => person.number === newNumber)) {
      alert(`${newNumber} is already added to phonebook!`)
      return
    }
    const personObject = {
      name: newName,
      id: String(persons.length + 2),
      number: newNumber
    }
    personService.create(personObject)
    // axios.post('http://localhost:3002/persons', personObject)
    .then(data => {
      console.log('post response',data)
      setPersons(persons.concat(data))
    })
    // setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')

  }

  const triggerDeletion = (id) => {
      if (window.confirm(`Delete ${persons.find(person => person.id === id).name}?`)) {
        console.log('delete event target', id)
        setPersons(persons.filter(person => person.id !== id))
        console.log('delete', event.target.value)
        personService.delete_number(id)
      }
  }

  const triggerUpdate = (id, number) => {
    if (window.confirm(`${persons.find(person => person.id === id).name} is already added in the phone book. Replace the number?`)) {
      console.log('update number', id)
      const person = persons.find(person => person.id === id)
      const changedPerson = {...person, number: number}
      personService.update_number(id, changedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id === id ? returnedPerson : person))
      })
    }
  }

  const nameToShow = showAll 
    ? persons
    : persons.filter(person => person.name.match(searchName))

  return (
    <div>
      <h2>Phonebook</h2>
      <NameFilter value={searchName} handleonChange={handleSearchNameChange} />
    
      <h3>Add a new</h3>

      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      
      <h3>Numbers</h3>
      <PersonList nameToShow={nameToShow} triggerDeletion={triggerDeletion}/>
        
      ...
      <div>debug: {newName}</div>
    </div>
  )
}

export default App