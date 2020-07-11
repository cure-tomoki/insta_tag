import * as React from 'react';
import { AnyAction } from 'typescript-fsa';

import { RootState } from '~/ducks';

// root context
export const Context = React.createContext<{
  state: RootState;
  dispatch: React.Dispatch<AnyAction>;
} | null>(null);
