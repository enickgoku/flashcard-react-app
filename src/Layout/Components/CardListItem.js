import React from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import { useDecks } from '../../hooks/useDecks'

function CardListItem({ currentDeck }){
  const { getDeck, deleteCard } = useDecks()
  const { deckId } = useParams()
  const history = useHistory()

  const handleDeleteCard = (id) => {
    if (window.confirm("Are you sure you want to delete this Card?")) {
      try{
        deleteCard(id)
        history.push(`/decks/${deckId}`)
      } catch(error) {
        console.log(error)
      }
    } 
  }

  const deck = getDeck(deckId)

  if (!deck) return null

  const { cards } = deck

  return (
    <>
      {cards?.map((card, index) => (
        <div className='card-body list-group-item' key={index}>
          <div key={index} className="row align-items-start">
            <div className="d-flex justify-content-center col-6">
              {card.front}
            </div>
            <div className="d-flex justify-content-center col-6">
              {card.back}
            </div>
              <Link to={`/decks/${deckId}/cards/${card.id}/edit`} className="btn btn-secondary mr-1 float-right"><span className="oi oi-pencil"></span> Edit</Link>
              <button type="delete" className="btn btn-danger float-right" onClick={() => handleDeleteCard(card.id)}><span className="oi oi-trash"></span></button>
          </div>
        </div>
      ))}
    </>
  )
}

export default CardListItem
