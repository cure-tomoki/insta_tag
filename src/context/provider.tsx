import * as React from 'react';

import { Context } from './context';

import { RootReducer, RootInitialState } from '~/ducks';

interface Props {
  children: React.ReactNode;
}

// provider for root context
export const Provider = ({ children }: Props) => {
  const [state, dispatch] = React.useReducer(RootReducer, RootInitialState);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};
