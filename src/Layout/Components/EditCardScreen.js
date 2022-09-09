import React from 'react'
import { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useDecks } from '../../hooks/useDecks'
import Navbar from '../Navbar'
import Form from './Form'

function EditCardScreen() {
  const { deckId, cardId } = useParams()
  const history = useHistory()
  const { getDeck, updateCard } = useDecks()

  const [formData, setFormData] = useState({
    id: +cardId,
    deckId: +deckId,
    front: "",
    back: "",
  })

  const handleChange = async ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    updateCard(formData)
    history.push(`/decks/${deckId}`)
  }

  const currentDeck = getDeck(deckId)

  if (!currentDeck) return null

  return (
    <>
      <Navbar currentDeck={currentDeck} />
      <h1>Edit Card</h1>
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

export default EditCardScreen
