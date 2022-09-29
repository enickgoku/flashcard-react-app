import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react'

const reducer = (state, action) => {
  const { type, payload = {} } = action

  console.debug('useDecks', type, payload)

  switch (type) {
    case 'CREATE_CARD': {
      const { deckId, card } = payload

      const allIds = state.cards.map(card => card.id)
      allIds.push(0)
      const prevId = Math.max(...allIds)

      state.cards.push({
        ...card,
        deckId: +deckId,
        id: prevId + 1,
      })

      return state
    }

    case 'DELETE_CARD': {
      const { cardId } = payload

      return {
        ...state,
        cards: state.cards.filter(card => +card.id !== +cardId)
      }
    }

    case 'CREATE_DECK': {
      const { deck } = payload

      const allIds = state.decks.map(deck => deck.id)
      allIds.push(0)
      const prevId = Math.max(...allIds)

      state.decks.push({
        ...deck,
        id: prevId + 1,
      })

      return state
    }

    case 'DELETE_DECK': {
      const { deckId } = payload

      return {
        ...state,
        decks: state.decks.filter(deck => +deck.id !== +deckId)
      }
    }

    case 'UPDATE_CARD': {
      const { card } = payload
      const cards = state.cards.filter(c => +c.id !== +card.id)
      cards.push(card)

      return {
        ...state,
        cards,
      }
    }

    case 'UPDATE_DECK': {
      const { deck } = payload
      const decks = state.decks.filter(d => +d.id !== +deck.id)
      decks.push(deck)

      return {
        ...state,
        decks,
      }
    }

    default:
      throw new Error(`No case for ${type}`)
  }
}

const initialState = {
  "decks": [
    {
      "id": 1,
      "name": "Wines at Canopy",
      "description": "All wines and descriptions currently offered at The Canopy Lounge."
    },
    {
      "name": "Food at The Canopy Lounge",
      "description": "Trivia regarding food at the The Canopy Lounge.",
      "id": 2
    }
  ],
  "cards": [
    {
      "id": 1,
      "front": "What Pinor Noirs do we have?",
      "back": "Candoni, and Buena Vista",
      "deckId": 1
    },
    {
      "id": 2,
      "front": "How many red wine blends do we carry?",
      "back": "4",
      "deckId": 1
    },
    {
      "id": 3,
      "front": "What ingredients are in the Bear With Me?",
      "back": "Highclere castle gin, honey lavender syrup, lemon juice.",
      "deckId": 1
    },
    {
      "front": "What is the most expensive item on our food menu?",
      "back": "Venison Medallions.",
      "deckId": 2,
      "id": 4
    },
    {
      "front": "What comes on top of the baked crab artichoke dip?",
      "back": "Pesto.",
      "deckId": 2,
      "id": 5
    },
    {
      "front": "What is the base for the Five mushroom soup?",
      "back": "A sherry cream.",
      "deckId": 2,
      "id": 5
    }
  ]
}


const DecksContext = createContext(initialState)

export const DecksProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const cards = useMemo(() => state.cards, [state.cards])
  const decks = useMemo(() => state.decks, [state.decks])

  const createCard = useCallback((deckId, card) => {
    dispatch({
      type: 'CREATE_CARD',
      payload: {
        deckId,
        card,
      },
    })
  }, [])

  const createDeck = useCallback(deck => {
    dispatch({
      type: 'CREATE_DECK',
      payload: { deck },
    })
  }, [])

  const getDecks = useCallback(() => {
    const result = {}

    for (const deck of state.decks) {
      result[deck.id] = { ...deck, cards: [] }
    }

    for (const card of state.cards) {
      if (result[card.deckId]){
        result[card.deckId].cards.push(card)
      }
    }

    return Object.values(result)
  }, [state.cards, state.decks])

  const getDeck = useCallback(deckId => {
    const decks = getDecks()
    const deck = decks.find(deck => +deck.id === +deckId)
    console.info(deck)
    return deck
  }, [getDecks])

  const deleteCard = useCallback(cardId => {
    dispatch({
      type: 'DELETE_CARD',
      payload: { cardId },
    })
  }, [])

  const deleteDeck = useCallback(deckId => {
    dispatch({
      type: 'DELETE_DECK',
      payload: { deckId },
    })
  }, [])

  const updateCard = useCallback(card => {
    dispatch({
      type: 'UPDATE_CARD',
      payload: { card },
    })
  }, [])

  const updateDeck = useCallback(deck => {
    dispatch({
      type: 'UPDATE_DECK',
      payload: { deck },
    })
  }, [])

  const value = useMemo(
    () => ({
      cards,
      decks,
      createCard,
      createDeck,
      deleteCard,
      deleteDeck,
      getDecks,
      getDeck,
      updateCard,
      updateDeck,
    }),
    [cards, createCard, createDeck, decks, deleteCard, deleteDeck, getDeck, getDecks, updateCard, updateDeck]
  )

  return (
    <DecksContext.Provider value={value}>{children}</DecksContext.Provider>
  )
}

export const useDecks = () => useContext(DecksContext)
