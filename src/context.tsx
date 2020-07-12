import * as React from 'react';
import { AnyAction } from 'typescript-fsa';

import { RootState, RootReducer, RootInitialState } from '~/ducks';

// root context
export const Context = React.createContext<{
  state: RootState;
  dispatch: React.Dispatch<AnyAction>;
}>({
  state: RootInitialState,
  dispatch: () => null,
});

// provider for root context
export const Provider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = React.useReducer(RootReducer, RootInitialState);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};
