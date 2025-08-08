import { useState, useEffect } from 'react'
import Note from './components/Note'
// import axios from 'axios'
import './index.css'

import noteService from './services/notes'

const App = (props) => {
  // const { notes } = props
  // console.log('app props', notes)
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState(
    'a new note...'
  ) 

  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    console.log('effect')
    noteService.getAll()
    // axios
    //   .get('http://localhost:3001/notes')
      .then(initialNotes => {
        console.log('promise fulfilled', initialNotes)

        setNotes(initialNotes)
      })
  }, [])
  console.log('render', notes.length, 'notes')

 const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }
  // const addNote = (event) => {
  //   event.preventDefault()
  //   console.log('button clicked', event.target)
  //   const noteObject = {
  //     content: newNote,
  //     important: Math.random() < 0.5,
  //     id: String(notes.length + 1)
  //   }
  //   setNotes(notes.concat(noteObject))
  //   setNewNote("")
  // }

  const addNote = event => {
  event.preventDefault()
  const noteObject = {
    content: newNote,
    important: Math.random() < 0.5,
    id: String(notes.length + 1)
  }

  // axios
  //   .post('http://localhost:3001/notes', noteObject)
  noteService.create(noteObject)
    .then(returnedNote => {
      console.log(returnedNote)
      setNotes(notes.concat(returnedNote))
      setNewNote('')
    })
  }  

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  const toggleImportanceOf = (id) => {
    console.log('toggle importance', id)
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    // axios.put(url, changedNote)
    noteService.update(id, changedNote)
    .then(returnedNote => {
      setNotes(notes.map(note => note.id === id ? returnedNote : note))
      // response => {
      // setNotes(notes.map(note => note.id === id ? response.data : note))
    })
  }

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}

        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
        <Note 
        key={note.id} note={note} 
        toggleImportanceOf={() => toggleImportanceOf(note.id)}
        />
        )}
        {/* <li>{notes[0].content}</li>
        <li>{notes[1].content}</li>
        <li>{notes[2].content}</li> */}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote}
          onChange={handleNoteChange}
        />
        {/* <input /> */}
        <button type="submit">save</button>
      </form>   
    </div>
  )
}

export default App