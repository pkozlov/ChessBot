import React, { createContext, useReducer, Dispatch } from 'react';
import { appReducer, Actions, StateType} from './reducers';

const initialState = {
  page: 'loading' as 'loading',
  // gameId: null,
  game: null,
  isLoading: false
}

const AppContext = createContext<{
  state: StateType;
  dispatch: Dispatch<Actions>;
}>({
  state: initialState,
  dispatch: () => null
});

type Props = {
  children?: React.ReactNode
};

const AppProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{state, dispatch}}>
      {children}
    </AppContext.Provider>
  )
}

export { AppProvider, AppContext };
