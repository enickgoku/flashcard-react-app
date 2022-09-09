import React from 'react'
import { useRouteMatch, Link, useParams } from 'react-router-dom'

function Navbar({ currentDeck = {} }) {
  const { deckId } = useParams()
  const match = useRouteMatch()
  const path = match.path
  const pathMatchStudy = path.includes('/study')
  const pathMatchCardEdit = path.includes(`/:cardId/edit`)
  const pathMatchNewCard = path.includes('/cards/new')
  const pathMatchNewDeck = path.includes('/decks/new')
  const pathMatchDeckScreen = path.includes(`/decks/:deckId`)
  const pathMatchEditDeck = path.includes(`/decks/:deckId/edit`)

  // will render a different navbar based on the url
  return (
    <>
      { pathMatchStudy ? (
      <nav aria-label="breadcrumb" className='d-flex flex-column'>
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/"><span className="oi oi-home"></span> Home</Link></li>
          <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}> {currentDeck?.name}</Link></li>
          <li className="breadcrumb-item active"> Study</li>
        </ol>
      </nav>
      ) : pathMatchCardEdit ? (
      <nav aria-label="breadcrumb" className='d-flex flex-column'>
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/"><span className="oi oi-home"></span> Home</Link></li>
          <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}> {currentDeck?.name}</Link></li>
          <li className="breadcrumb-item active" aria-current="page"> Edit Card</li>
        </ol>
      </nav>
      ) : pathMatchNewDeck ? (
        <nav aria-label="breadcrumb" className='d-flex flex-column'>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/"><span className="oi oi-home"></span> Home</Link></li>
            <li className="breadcrumb-item active" aria-current="page"> Create Deck</li>
          </ol>
        </nav>  
      ) : pathMatchNewCard ? (
        <nav aria-label="breadcrumb" className='d-flex flex-column'>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/"><span className="oi oi-home"></span> Home</Link></li>
            <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}> {currentDeck?.name}</Link></li>
            <li className="breadcrumb-item active" aria-current="page"> Add Card</li>
          </ol>
        </nav> 
      ) : pathMatchEditDeck ? (
        <nav aria-label="breadcrumb" className='d-flex flex-column'>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/"><span className="oi oi-home"></span>Home</Link></li>
            <li className="breadcrumb-item"><a href={`/decks/${deckId}`}>{currentDeck?.name}</a></li>
            <li className="breadcrumb-item active">Edit Deck</li>
          </ol>
        </nav>
      ) : pathMatchDeckScreen ? (
        <nav aria-label="breadcrumb" className='d-flex flex-column'>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/"><span className="oi oi-home"></span> Home</Link></li>
            <li className="breadcrumb-item active">{currentDeck?.name}</li>
          </ol>
        </nav>
      ) : null }
    </>
  )
}

export default Navbar
