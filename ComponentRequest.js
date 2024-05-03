import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ComponentRequest() {
  const [message, setMessage] = useState('');
  const [inputValue, setInputValue] = useState('')
  const [items, setItems] = useState([])

  useEffect(() => {
    axios.get('http://localhost:9735/api/hello-world/')
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.log(error);
      });

      axios.get('http://localhost:9735/api/react/')
      .then(response =>{
        setItems(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, []);

  return (
    <div>
      {/* <h1>Hello, World!</h1> */}
      <p>{message}</p>
      <br/>
        <input 
            type='text'
            value={inputValue}
            onChange={(event) => {
                setInputValue(event.currentTarget.value)
            }}
        />
        <button
            onClick={() =>{
              axios.post('http://localhost:9735/api/react/', {name: inputValue})
              .then(response => {
                axios.get('http://localhost:9735/api/react/').then(response => setItems(response.data)).catch(error => console.log(error))
              })
              .catch(error => console.log(error))
              setInputValue('')
            }}
        >
            SEND
        </button>
        
      <ul>
        {items.map(i=>
        <li 
          key={i.id}
          onClick={() => {
            axios.delete(`http://localhost:9735/api/react_detail/${i.id}`).then(response => {
              axios.get('http://localhost:9735/api/react/').then(response => setItems(response.data)).catch(error => console.log(error))
            }).catch(error => console.log(error))
          }}
          
        >
          {`${i.id} ${i.name}`}
        </li>)}
      </ul>
    </div>
  );
}

export default ComponentRequest;
