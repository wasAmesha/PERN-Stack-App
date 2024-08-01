import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);

  async function getNotes(){
    const response = await axios({
      method: 'get',
      url: "http://localhost:8070/notes",
    });
    //console.log(response.data.data);
    setNotes(response.data.data);
  }

  async function addNote(){
    await axios({
      method: 'post',
      url: 'http://localhost:8070/add',
      data:{
        id: Math.random().toString(),
        title: title,
        content: content,
      },
    });
    setTitle('');
    setContent('');
    getNotes();
  }

  useEffect(function (){
    getNotes();
  }, []);

  return (
    <>
      <div className='form'>
        <input 
          value={title} 
          onChange={(e)=>{
            setTitle(e.target.value);
          }} 
          type='text' 
          placeholder='Title'
          />
        <input 
          value={content}
          onChange={(e)=> setContent(e.target.value)}
          content={content}
          type='text' 
          placeholder='Content'
          />
        <button onClick={addNote}>Add</button>

        <div className='notes'>
          {notes.map((element)=>{
            return(
              <div 
                key={element.id}
                style={{backgroundColor: "blue", borderRadius: "10px"}}
              >
                <h2>{element.title}</h2>
                <p>{element.content}</p>
              </div>
            )
          })}
        </div>
      </div>
    </>
  );
}

export default App
