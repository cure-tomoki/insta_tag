import * as React from 'react';

import EditorPage from '~/components/pages/Editor';
import { Provider } from '~/context/provider';

const App: React.FC = () => {
  // TODO: add router and stuff
  return (
    <Provider>
      <EditorPage />
    </Provider>
  );
};

export default App;
