import React from 'react'
import Navbar from "../Navbar"
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDecks } from '../../hooks/useDecks'

function CreateDeckScreen() {
  const history = useHistory()
  const { createDeck } = useDecks()

  const intitialDeckData = {
    name: "",
    description: "",
  }
  const [newDeck, setNewDeck] = useState(intitialDeckData)

  const handleChange = ({ target }) => {
    setNewDeck({
      ...newDeck,
      [target.name]: target.value
    })
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault()
    createDeck(newDeck)
    history.push('/')
  }

  return (
    <>
      <Navbar />
      <h1>Create Deck</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor='name'>Name</label>
          <input type="text" name="name" className="form-control form-control-lg" id="name" placeholder="Deck Name" onChange={handleChange} value={newDeck.name} />
        </div>
        <div className="form-group">
          <label htmlFor='description'>Description</label>
          <textarea type="text" name="description" className="form-control form-control-lg" id="description" rows="3" placeholder="Brief description of the deck." onChange={handleChange} value={newDeck.description}></textarea>
        </div>
        <div className='d-flex'>
          <a href={`/`} className="btn btn-secondary mr-1" type="cancel">Cancel</a>
          <button className="btn btn-primary" type="submit">Submit</button>
        </div>
      </form>
    </>
  )
}

export default CreateDeckScreen
