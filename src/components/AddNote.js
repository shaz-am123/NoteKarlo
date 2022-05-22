import React, {useContext, useState} from 'react'
import noteContext from "../context/notes/noteContext"

export default function AddNote(props) {
  const showAlert = props.showAlert;
  const {addNote} = useContext(noteContext) 

  const [note, setNote] = useState({
      title: "",
      description: "",
      tag: ""
  })

  const onChange = (e)=>{
      setNote({...note, [e.target.name]: e.target.value})
  }

  const handleClick= (e)=>{
    e.preventDefault()
    addNote(note.title, note.description, note.tag)
    showAlert("Successfully added the note", 'success');
    setNote({
      title: "",
      description: "",
      tag: ""
    })
  }
  
  return (
    <div className='container'>
      <h1>Add note</h1>
        <form >
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name="title" onChange={onChange} value={note.title} minLength={3} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea rows={5} type="text" className="form-control" id="description" name="description" value={note.description} minLength={5} onChange={onChange} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange}/>
          </div>
          <button disabled={note.title.length<3 || note.description.length<5} type="submit" className="btn btn-primary"  onClick={handleClick}>Add Note</button>
        </form>
    </div>
  )
}
