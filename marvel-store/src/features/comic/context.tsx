import React from 'react'

export enum ComicsActionKind {
  UPDATE_PAGE = 'UPDATE_PAGE',
  UPDATE_COMIC_NAME = 'UPDATE_COMIC_NAME',
  UPDATE_CHARACTER_ID = 'UPDATE_CHARACTER_ID'
}
type Action = {
  type: ComicsActionKind
  payload: any
}
type Dispatch = (action: Action) => void
type State = {
  page: number
  titleStartsWith: string
  characterId: number
}
type ComicProviderProps = { children: React.ReactNode }

const ComicsContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined)

const INITIAL_STATE: State = {
  page: 0,
  titleStartsWith: '',
  characterId: 0
}

function comicsReducer(state: State, action: Action) {
  switch (action.type) {
    case ComicsActionKind.UPDATE_PAGE: {
      return {
        ...state,
        page: action.payload
      }
    }

    case ComicsActionKind.UPDATE_COMIC_NAME: {
      return {
        ...state,
        titleStartsWith: action.payload
      }
    }

    case ComicsActionKind.UPDATE_CHARACTER_ID: {
      return {
        ...state,
        characterId: action.payload
      }
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function ComicsProvider({ children }: ComicProviderProps) {
  const [state, dispatch] = React.useReducer(
    comicsReducer,
    INITIAL_STATE as never
  )

  const value = { state, dispatch }

  return (
    <ComicsContext.Provider value={value}>{children}</ComicsContext.Provider>
  )
}

function useComics() {
  const context = React.useContext(ComicsContext)

  if (context === undefined) {
    throw new Error('useComics must be used within a ComicsContext')
  }

  return context
}

export { ComicsProvider, useComics }
