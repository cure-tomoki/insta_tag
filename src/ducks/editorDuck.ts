import { createSelector } from 'reselect';

import { RootState } from '~/ducks';

export interface EditorState {
  hashtags: string[];
}

export const initialEditorState: EditorState = {
  hashtags: [],
};

// selectors (data accessors)
export const selectors = {
  getHashtags: createSelector(
    (state: RootState) => state.editor.hashtags,
    (hashtags) => hashtags
  ),
};

// TODO: export actions

// TODO: export reducer
