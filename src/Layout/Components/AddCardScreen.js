import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useState } from 'react'
import Navbar from '../Navbar'
import Form from './Form'
import { useDecks } from '../../hooks/useDecks'

function AddCardScreen() {
  const { deckId } = useParams()
  const history = useHistory()
  const { createCard, getDeck } = useDecks()

  const deck = getDeck(deckId)

  const initialFormData = {
    front: "",
    back: "",
  }

  const [formData, setFormData] = useState(initialFormData)

  const handleChange = async ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    createCard(deckId, formData)
    setFormData(initialFormData)
    history.push(`/decks/${deckId}`)
  }

  if (!deck) return null

  return (
    <>
      <Navbar currentDeck={deck} />
      <h1>{deck.name}: Add Card</h1>
      <form onSubmit={handleSubmit}>
        <Form formData={formData} handleChange={handleChange} />
        <div className='d-flex'>
          <a href={`/decks/${deckId}`} className="btn btn-secondary mr-1" type="cancel">Cancel</a>
          <button className="btn btn-primary" type="submit">Save</button>
        </div>
      </form>
    </>
  )
}

export default AddCardScreen
