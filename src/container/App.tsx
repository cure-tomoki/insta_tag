import * as React from 'react';

import * as editorDuck from '~/ducks/editorDuck';
import { useRootContext } from '~/hooks/useRootContext';

const App: React.FC = () => {
  const rootState = useRootContext();

  const hashtags = editorDuck.selectors.getHashtags(rootState);

  return (
    <>
      <h1>App</h1>
      <ul>
        {hashtags.map((tag, idx) => (
          <li key={`tag-${idx}`}>{`#${tag}`}</li>
        ))}
      </ul>
      <pre>{JSON.stringify(rootState)}</pre>
    </>
  );
};

export default App;
