import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDecks } from '../../hooks/useDecks'

function DeckItem({ deck }) {
  const history = useHistory()
  const { deleteDeck } = useDecks()

  const handleDeleteDeck = () => {
    if (window.confirm("Are you sure you want to delete this Study Deck?")) {
      deleteDeck(deck.id)
      history.push('/')
    } 
  }

  return (
    <>
      <div className="list-group-item list-group-item-action flex-column align-items-start">
        <div className="d-flex justify-content-between w-100">
          <h2 className="mb-1">{deck.name}</h2><span>{deck.cards.length} cards</span>
        </div>
        <p className="mb-1">{deck.description}</p>
        <Link to={`/decks/${deck.id}`} className="btn btn-secondary mr-1"><span className="oi oi-eye"></span> View</Link>
        <Link to={`/decks/${deck.id}/study`} className="btn btn-primary"><span className="oi oi-book"></span> Study</Link>
        <button type="delete" className="btn btn-danger float-right" onClick={handleDeleteDeck}><span className="oi oi-trash"></span></button>
      </div>
    </>
  )
}

export default DeckItem
