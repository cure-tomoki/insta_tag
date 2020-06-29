import * as React from 'react';

import context from '~/context';

export const useRootContext = () => React.useContext(context);
