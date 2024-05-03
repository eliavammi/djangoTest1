import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ComponentRequest() {
  const [message, setMessage] = useState('');
  const [inputValue, setInputValue] = useState('')
  const [cognome, setCognome] = useState('')
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
      <p>{message}</p>
      <br/>
        <input 
            type='text'
            value={inputValue}
            onChange={(event) => {
                setInputValue(event.currentTarget.value)
            }}
            placeholder='name'
        />
        <input 
            type='text'
            value={cognome}
            onChange={(event) => {
                setCognome(event.currentTarget.value)
            }}
            placeholder='cognome'
        />
        <button
            onClick={() =>{
              axios.post('http://localhost:9735/api/react/', {name: inputValue, cognome: cognome})
              .then(response => {
                axios.get('http://localhost:9735/api/react/').then(response => setItems(response.data)).catch(error => console.log(error))
              })
              .catch(error => console.log(error))
              setInputValue('')
              setCognome('')
            }}
        >
            SEND
        </button>
        <div>
          <ul>
        {items.map(i=>
        <div>
          <p 
            key={i.id}
          onClick={() => {
            axios.delete(`http://localhost:9735/api/react_detail/${i.id}`).then(response => {
              axios.get('http://localhost:9735/api/react/').then(response => setItems(response.data)).catch(error => console.log(error))
            }).catch(error => console.log(error))
          }}
          >
            {`${i.id}. ${i.name} ${i.cognome}` }
          </p>
        </div>
      )}
      </ul>
        </div>
    </div>
  );
}

export default ComponentRequest;
