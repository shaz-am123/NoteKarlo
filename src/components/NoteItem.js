import React, {useContext} from 'react'
import noteContext from '../context/notes/noteContext';

export default function NoteItem(props) {
    const {deleteNote} = useContext(noteContext);
    const {note, updateNote, showAlert} = props;

    const handleDelete=(id)=>{
      deleteNote(id);
      showAlert("Successfully deleted the note", 'success')
    }

  return (
    <div className="col-md-3">
        <div className="card my-3">
            <div className='card-body'>
                <h5 className='card-title'>{note.title}</h5>
                <p className='card-text'>{note.description}</p>
                <p className="card-text"><small className="text-muted">{note.tag}</small></p>
                <i className="far fa-trash-alt mx-1" onClick={()=>handleDelete(note._id)}></i>
                <i className="far fa-edit mx-1" onClick={()=>updateNote(note, showAlert)}></i>
            </div>
        </div>
    </div>
  )
}
