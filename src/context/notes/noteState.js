import NoteContext from "./noteContext";
import {useState} from "react";

const NoteState = (props)=>{
  const host = "https://notekaro.herokuapp.com/api/notes"
    const [notes, setNotes] = useState([]);

    //Fetch all notes, LOGIN REQUIRED
    const fetchNotes = async ()=>{
      //TODO API CALL;
        const url = `${host}/fetchnotes`
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          },
           
        });
        const json = await response.json();
        setNotes(json)
    }

    //ADD a note, LOGIN REQUIRED
    const addNote = async (title, description, tag)=>{
      //TODO API CALL;
        const url = `${host}/addnotes`
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          },
          body: JSON.stringify({title, description, tag}) 
        });

        const json = await response.json();

      setNotes(notes.concat(json))
      
    }

    //edit a note, LOGIN REQUIRED
    const editNote= async(id, title, description, tag)=>{

      //TODO API CALL;
        const url = `${host}/updatenotes/${id}`
        const response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          },
          body: JSON.stringify({title, description, tag}) 
        });

        const json = await response.json();
        
      
        let newNotes = JSON.parse(JSON.stringify(notes))
        // Logic to edit in client
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

    //DELETE a note, LOGIN REQUIRED
    const deleteNote = async (id)=>{
      
      //TODO API CALL;
        const url = `${host}/deletenotes/${id}`
        const response = await fetch(url, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          },
          
        });

        const json = await response.json();

        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }


    return (
    <NoteContext.Provider value={{notes, addNote, editNote, deleteNote, fetchNotes}}>
        {props.children}
    </NoteContext.Provider>)
}

export default NoteState;