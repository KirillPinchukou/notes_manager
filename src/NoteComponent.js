import React from 'react'
import Draggable from 'react-draggable'

export default function NoteComponent({item, onDeleteNote, onPositionChange}) {
  const deleteNote = (id) => {
    onDeleteNote(id)
  }

  const updatePosition = (id, data) => {
    onPositionChange(id, data)
  }

    return(
        <Draggable
            defaultPosition={item.defaultPosition}
            onStop={(_, data) => {
            updatePosition(item.id, data)
             }
        }
      >
        <div className="note_item" style={{backgroundColor: item.color}}>
          {item.note}
          <button className='delete_button' onClick={() => deleteNote(item.id)}>
          x
        </button>
        <div className='note_tag'>{item.tag}</div>
        </div>  
      </Draggable>
    )
}