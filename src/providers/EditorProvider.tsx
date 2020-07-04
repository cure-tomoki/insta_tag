import * as React from 'react';

import EditorContext from '~/contexts/editorContext';
import { editorReducer, initialState } from '~/ducks/EditorDuck';

interface Props {
  children: React.ReactNode;
}

const EditorProvider = ({ children }: Props) => {
  const [state, dispatch] = React.useReducer(editorReducer, initialState);

  return (
    <EditorContext.Provider value={{ state, dispatch }}>
      {children}
    </EditorContext.Provider>
  );
};

export default EditorProvider;
