import { ReactElement, createContext, useContext, useReducer } from "react"

/**
 * https://reactjs.org/docs/hooks-reference.html#usereducer
 * https://reactjs.org/docs/context.html#gatsby-focus-wrapper
 */

type State = {
  expanded: boolean
}

type ActionType = { type: "OPEN_CLOSE"; payload: boolean }

type Store = {
  state: State
  open: () => void
  close: () => void
  toggle: () => void
}

const initialState: Store = {
  state: {
    expanded: false,
  },
  open: () => ({}),
  close: () => ({}),
  toggle: () => ({}),
}

const AppContext = createContext<Store>(initialState)

AppContext.displayName = "AppContext"

const reducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case "OPEN_CLOSE":
      return {
        ...state,
        expanded: action.payload,
      }
  }
}

export const AppContextProvider = ({
  children,
}: {
  children: ReactElement
}): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState.state)

  const open = () => {
    dispatch({
      type: "OPEN_CLOSE",
      payload: true,
    })
  }

  const close = () => {
    dispatch({
      type: "OPEN_CLOSE",
      payload: false,
    })
  }

  const toggle = () => {
    dispatch({
      type: "OPEN_CLOSE",
      payload: !state.expanded,
    })
  }

  return (
    <AppContext.Provider value={{ state, open, close, toggle }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext(): Store {
  const context = useContext(AppContext)
  if (context === undefined || context === null) {
    throw new Error(`useAppContext must be called within AppContextProvider`)
  }
  return context
}
