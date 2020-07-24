import * as React from 'react';

import { Context } from '~/context';

const useRootContext = () => {
  return React.useContext(Context);
};

export default useRootContext;
