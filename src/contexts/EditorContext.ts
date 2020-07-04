import * as React from 'react';
import { AnyAction } from 'typescript-fsa';

import { EditorState } from '~/ducks/EditorDuck';

const EditorContext = React.createContext<{
  state: EditorState;
  dispatch: React.Dispatch<AnyAction>;
} | null>(null);

export default EditorContext;
