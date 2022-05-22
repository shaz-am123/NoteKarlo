import React from 'react'
import AddNote from './AddNote'
import Notes from "./Notes"

export default function Home(props) {
  return (
    <div className='container my-3'>
      <AddNote showAlert={props.showAlert}/>
      <Notes showAlert={props.showAlert}/>
    </div>
  )
}
