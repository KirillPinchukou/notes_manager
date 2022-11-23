import React from 'react'

export default function TagBarComponent({tag, onFilterNotes, onDeleteTag}) {
    const filterNotes = (tag) => {
        onFilterNotes(tag)
      }
    const deleteTag = (tag) => {
        onDeleteTag(tag)
    }    

    return (
        <div >
            <a
             className='tag'
             onClick={(e) => filterNotes(tag)}>
             |{tag}|
            </a>   
            <button onClick={() => deleteTag(tag)}>X</button>     
        </div>
    )
}