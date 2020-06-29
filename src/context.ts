import * as React from 'react';

import { RootState } from '~/ducks';

const rootContext = React.createContext<RootState | null>(null);

export default rootContext;
