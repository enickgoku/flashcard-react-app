import React from 'react'
import Navbar from '../Navbar'
import { useParams, useHistory } from 'react-router-dom'
import { useState } from 'react'
import { useDecks } from '../../hooks/useDecks'

function EditDeckScreen() {
  const history = useHistory()
  const { deckId } = useParams()
  const { getDeck, updateDeck } = useDecks()

  const [formData, setFormData] = useState({
    id: deckId,
    name: "",
    description: "",
    cards: [],
  })

  // let initialFormData = {
  //   id: deckId,
  //   name: deck.name,
  //   description: deck.description,
  // }
  
  const handleChange = async (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault()
    updateDeck(formData)
    history.push(`/decks/${deckId}`)
  }

  const deck = getDeck(deckId)

  if (!deck) return null

  return (
    <>
      <Navbar currentDeck={deck} />
      <h1>Edit Deck</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor='name'>Name</label>
          <input type="text" name="name" className="form-control form-control-lg" id="name" placeholder="Deck Name" value={formData.name} onChange={handleChange}/>
        </div>
        <div className="form-group">
          <label htmlFor='description'>Description</label>
          <textarea type="text" name="description" className="form-control form-control-lg" id="description" rows="3" placeholder="Description" value={formData.description} onChange={handleChange}></textarea>
        </div>
        <div className='d-flex'>
          <a href={`/decks/${deckId}`} className="btn btn-secondary mr-1" type="cancel">Cancel</a>
          <button className="btn btn-primary" type="submit">Submit</button>
        </div>
      </form>
    </>
  )
}

export default EditDeckScreen
