import React from 'react'
import { Link } from 'react-router-dom'
import DeckItem from './DeckItem'
import { useDecks } from '../../hooks/useDecks'


function HomeScreenDeckDisplay() {
  const { getDecks } = useDecks()

  const decks = getDecks()

  return (
    <>
      <Link to={`/decks/new`} className="btn btn-secondary mb-2"><span className="oi oi-plus"></span> Create Deck</Link>
      <div className="list-group">
        {decks?.map(deck => <DeckItem key={deck.id} deck={deck} />)}
      </div>
    </>
  )
}

export default HomeScreenDeckDisplay
