import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ComponentRequest() {
  const [inputValue, setInputValue] = useState('')
  const [cognome, setCognome] = useState('')
  const [items, setItems] = useState([])
  const [nameFilter, setNameFilter] = useState('')
  const [select, setSelect] = useState('')
  const [selected, setSelected] = useState([])

  useEffect(() => {
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
      {/* <p>{message}</p> */}
      <br/>
        <input 
            type='text'
            value={inputValue}
            onChange={(event) => {
                setInputValue(event.currentTarget.value)
            }}
            placeholder='nome'
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
        <div key={i.id}>
          <p 
            key={i.id}
          >
            {`${i.id}. ${i.name} / ${i.cognome} / creation date: ${new Date(i.creationDate).toLocaleString()} / last update: ${new Date(i.updateDate).toLocaleString()}` }<button
            onClick={() => {
              axios.put(`http://localhost:9735/api/react_detail/${i.id}/`, {name: inputValue === '' ? i.name : inputValue, cognome: cognome === '' ? i.cognome : cognome})
              .then(response => axios.get(`http://localhost:9735/api/react/`).then(response => setItems(response.data)).catch(error => console.log(error)))
              .catch(error => console.log(error))
              setCognome('')
              setInputValue('')
            }}
          >
            UPDATE
          </button>
          <button
            onClick={() => {
              axios.delete(`http://localhost:9735/api/react_detail/${i.id}`).then(response => {
              axios.get('http://localhost:9735/api/react/').then(response => setItems(response.data)).catch(error => console.log(error))
            }).catch(error => console.log(error))
            }}
          >
            ELIMINA
          </button>
          </p>
        </div>
        )}
          </ul>
        </div>
        <div>
          {/* <lable>Name Filter</lable><br/>
          <input type='text' name='nameFilter' value={nameFilter} onChange={(event) => setNameFilter(event.currentTarget.value)} placeholder='Name Filter'/>
          <button
            onClick={()=>{
              axios.post('http://localhost:9735/api/react-namefil/', {name:nameFilter}).then(response => console.log(response)).catch(error => console.log(error))
            }}
          >
            SEND
          </button> */}
          <br/><br/>
          <select value={select} onChange={(event)=>{setSelect(event.currentTarget.value)}}>
            {items.map(i => (
              <option value={i.id} key={i.id}>{`${i.name} ${i.cognome}`}</option>
            ))}
          </select>
          <button
            onClick={()=>{
              axios.get(`http://localhost:9735/api/react_detail/${select}/`,{})
              .then(response => {
                setSelected([response.data])
                console.log(response)
              })
              .catch(error => console.log(error))
            }}
          >
            SEND
          </button>
            <br/>
            {/* {selected.map(s => (<p>`${s.name} ${s.cognome}`)</p>)} */}
            {selected.map(s => <p>{`${s.name} ${s.cognome}`}</p>)}
        </div>
    </div>
  );
}

export default ComponentRequest;
