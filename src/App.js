import './App.css';
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import NoteState from './context/notes/noteState'
import Alert from './components/Alert';



function App() {
  const [alert, setAlert] = useState(null)
  const showAlert= function (message,type)
    {
        setAlert({
            msg: message,
            type: type
        })
        
        setTimeout(()=>{
            setAlert(null)
        },2500)
    }

  return (
    <>
        <NoteState>
          <Router>
            <Navbar title="iNotebook" about="About"/>
            <Alert style={{'height': '30px'}} alert={alert}/> 
              <div className='container'>
                <Routes>
                  <Route exact path="/" element={<Home showAlert={showAlert}/>}/>
                  <Route exact path="/about" element={<About/>}/>
                  <Route exact path="/login" element={<Login showAlert={showAlert}/>}/> 
                  <Route exact path="/signup" element={<Signup showAlert={showAlert}/>}/> 
                </Routes>
              </div>
            </Router>
        </NoteState>
    </>
  );
}

export default App;
