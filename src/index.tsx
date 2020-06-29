import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from '~/container/App';
import rootContext from '~/context';
import rootState from '~/ducks';

ReactDOM.render(
  <rootContext.Provider value={rootState}>
    <App />
  </rootContext.Provider>,
  document.getElementById('root')
);
