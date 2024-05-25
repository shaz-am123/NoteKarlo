import NoteContext from "./noteContext";
import {useState} from "react";

const NoteState = (props)=>{
  const host = process.env.REACT_APP_BACKEND_URL+"/api/note";
    const [notes, setNotes] = useState([]);

    const fetchNotes = async ()=>{
        const url = `${host}/fetchNotes`
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('auth-token')
          },
           
        });
        const json = await response.json();
        setNotes(json)
    }

    const addNote = async (title, description, tag)=>{
        const url = `${host}/addNote`
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('auth-token')
          },
          body: JSON.stringify({title, description, tag}) 
        });

        const json = await response.json();

      setNotes(notes.concat(json))
      
    }

    const editNote= async(id, title, description, tag)=>{

        const url = `${host}/updateNote/${id}`
        const response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('auth-token')
          },
          body: JSON.stringify({title, description, tag}) 
        });

        await response.json();
        
      
        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
          const element = newNotes[index];
          if (element._id === id) {
            newNotes[index].title = title;
            newNotes[index].description = description;
            newNotes[index].tag = tag; 
            break; 
          }
        }  
        setNotes(newNotes);
      
    }

    const deleteNote = async (id)=>{
      
        const url = `${host}/deleteNote/${id}`
        const response = await fetch(url, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('auth-token')
          },
          
        });

        await response.json();

        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }


    return (
    <NoteContext.Provider value={{notes, addNote, editNote, deleteNote, fetchNotes}}>
        {props.children}
    </NoteContext.Provider>)
}

export default NoteState;