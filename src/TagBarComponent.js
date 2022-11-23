import React from 'react'

export default function TagBarComponent({tag, onFilterNotes, onDeleteTag}) {
    const filterNotes = (tag) => {
        onFilterNotes(tag)
      }

    const deleteTag = (tag) => {
        onDeleteTag(tag)
    }    

    return (
        <div>
            <button
             className='tag_button'
             onClick={(e) => filterNotes(tag)}>
             {tag}
            </button>   
            <button onClick={() => deleteTag(tag)}>X</button>     
        </div>
    )
}