import React from 'react'
import { useState } from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'
import Navbar from '../Navbar'
import { useDecks } from '../../hooks/useDecks'

function StudyScreen() {
  const { deckId } = useParams()
  const [front, setFront] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const history = useHistory()

  //this component keeps track of multiples states in order to make rendering conditional
  const { getDeck } = useDecks()

  const deck = getDeck(deckId)

  if (!deck) return null

  const cards = deck.cards

  const nextButtonHandler = () => {
    if(currentIndex < cards?.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setFront(true)
    } else{
      if(
        window.confirm("Restart cards?  Click cancel to return to the home screen.")
      ) {
        setCurrentIndex(0)
        setFront(true)
      } else{
        history.push('/')
      }
    }
  }

  const flipButton = () => {
    setFront(!front)
  }

  const renderView = (
    <div className="d-flex card list-item-active mb-3">
      <div className="card-body"> 
        <h4 className="card-title">
          Card {currentIndex + 1} of {cards?.length} cards.
        </h4>
        <p className="card-text">
          {front ? cards[currentIndex]?.front : cards[currentIndex]?.back}
        </p>
        <button className="btn btn-secondary mr-1" onClick={flipButton}>Flip</button>
        {!front ? <button className="btn btn-primary" onClick={nextButtonHandler}>Next</button> : null}
      </div>
  </div>
  )

  if(cards?.length <= 2) {
    return (
      <>
        <Navbar currentDeck={deck} />
        <h1>{deck.name}: Study</h1>
        <h2>Not enough cards.</h2>
        <p>You need at least 3 cards to study.  There are {cards?.length} in this deck.</p>
        <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary ml-1"><span className="oi oi-plus"></span> Add Cards</Link>
      </>
    )
  } else {
    return (
      <>
        <Navbar currentDeck={deck} />
        {renderView}
      </>
    )
  }
}

export default StudyScreen
