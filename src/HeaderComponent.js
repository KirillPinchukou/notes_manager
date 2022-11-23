import React, {useState} from 'react'

export default function HeaderComponent({onSetNote, onNewNote}) {
    const setNote = (value) => {
        onSetNote(value)
    }
    
    const newNote = () => {
        onNewNote()
    }

    return(
        <header className='header'>
          <input
            className='note_input'
            type="text"
            placeholder='Text'
            onChange={(e) => setNote(e.target.value)}
           >
          </input>
          <button className='submit' onClick={newNote}>Submit</button> 
        </header>
    )
}