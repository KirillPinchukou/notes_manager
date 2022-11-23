import React, {useState, useEffect} from 'react'
import './App.css';
import { v4 } from 'uuid'
import { randomColor}  from 'randomcolor';
import NoteComponent from './NoteComponent';
import TagBarComponent from './TagBarComponent';
import HeaderComponent from './HeaderComponent';
 
export default function App() {
  const [note, setNote] = useState('')
  const [activeFilter,setActiveFilter] = useState(false)
  const [filteredNotes,setFilteredNotes] = useState([])
  const [tags,setTags] = useState(JSON.parse(localStorage.getItem('tags')) || [])
  const [notes,setNotes] = useState(JSON.parse(localStorage.getItem('notes')) ||[])

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  },[notes])

  useEffect(() => {
    localStorage.setItem('tags', JSON.stringify(tags))
  },[tags])

  const handleSetNote = (value) => {
    setNote(value);
  }

  const handleDeleteNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((item) => item.id !== id))
  }

  const handleDeleteTag = (tag) => {
    setTags([...tags].filter((item) => tag !== item))
  }
  const handleChangeNotePosition = (id, data) => {
    setNotes((prevNotes) => {
      const changingNote = prevNotes.find((item) => item.id === id)
      const newNotes =  prevNotes.filter((item) => item.id !== id)
      changingNote.defaultPosition = {x: data.x, y: data.y}
      return [...newNotes,changingNote]
    })
  }

  const handleNewNote = () => {
    if(note.trim() !== '') {
      let tag = note.split(/(#[a-z\d-]+)/ig).filter((item) => item.includes('#'))
      const newNote = {
        id: v4(),
        note: note,
        tag: tag[0],
        visible: true,
        color: randomColor({
          luminosity: 'light'
        }),
        defaultPosition: {
          x: 0,
          y: 0,
        }
      }
      setNotes((notes) => [...notes, newNote])
      if (tag.length > 0) {
        setTags((tags) => [...tags,tag])
      }
      setNote('')
    
    } else {
      alert('No text')
    }
  }
  const handleonFilterNotes = (tag) => {
    const filtered =  [...notes].filter((item) =>  tag[0] === item.tag)
    setFilteredNotes(filtered)
    setActiveFilter(true)
  }

  const showAllNotes = () => {
    setActiveFilter(false)
    setNotes([...notes])
  }

  return (
    <div className="App">
      <div className='wrapper'>
        <HeaderComponent
          onNewNote={handleNewNote}
          onSetNote={handleSetNote}
          >
        </HeaderComponent>
        
        <div className='tag_wrapper'>
          <div className='tag_list'>
            {tags.map((item, index) => {
              return(
                <TagBarComponent
                  key={index}
                  tag={item}
                  onFilterNotes={handleonFilterNotes}
                  onDeleteTag={handleDeleteTag}
                ></TagBarComponent>
              )
            })}
          <button onClick={() => showAllNotes()}>All notes</button>  
          </div>
        
        </div>
      {(activeFilter? filteredNotes: notes).map((item) => {
          return(
            <NoteComponent
              key={item.id}
              item={item}
              onDeleteNote={handleDeleteNote}
              onPositionChange={handleChangeNotePosition}
            ></NoteComponent>
          )
      })} 
      </div>
    </div>
  );
}

