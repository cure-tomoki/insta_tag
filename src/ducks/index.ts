import { EditorState, initialEditorState } from '~/ducks/editorDuck';

export interface RootState {
  editor: EditorState;
}

const rootState: RootState = {
  editor: initialEditorState,
};

export default rootState;
