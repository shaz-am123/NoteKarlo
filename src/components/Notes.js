import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from "../context/notes/noteContext"
import Noteitem from './NoteItem';

const Notes = (props) => {
    const showAlert = props.showAlert;
    const context = useContext(noteContext);
    const { notes, fetchNotes, editNote } = context;

    const navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem('token')){
            fetchNotes()
        }
        else{
            navigate("/login");
        }
        // eslint-disable-next-line
    }, [])
    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({id: "", e_title: "", e_description: "", e_tag: ""})

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote(
          {
             id: currentNote._id,
             e_title: currentNote.title, 
             e_description: currentNote.description, 
             e_tag:currentNote.tag
          })
    }

    const handleClick = (e)=>{ 
        editNote(note.id, note.e_title, note.e_description, note.e_tag)
        refClose.current.click();
        showAlert("Successfully updated the note", 'success');
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }

    return (
        <>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="e_title" name="e_title" value={note.e_title} aria-describedby="emailHelp" onChange={onChange} minLength={3} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea rows={5} type="text" className="form-control" id="e_description" name="e_description" value={note.e_description} onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="e_tag" name="e_tag" value={note.e_tag} onChange={onChange} />
                                </div>
 
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.e_title.length<3 || note.e_description.length<5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h2>Your Notes</h2>
                <div className="container mx-2"> 
                {notes.length===0 && 'No notes to display'}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} showAlert={showAlert}  note={note} />
                })}
            </div>
        </>
    )
}

export default Notes