import produce from 'immer';
import { createSelector } from 'reselect';
import actionCreatorFactory, { AnyAction, isType } from 'typescript-fsa';

import constants from '~/constants';

const actionCreator = actionCreatorFactory('editor');

export interface EditorState {
  hashtags: string[];
}

export const initialState: EditorState = {
  hashtags: [],
};

// selectors (data accessors)
export const selectors = {
  getHashtags: createSelector(
    (state: EditorState) => state.hashtags,
    (hashtags) => hashtags
  ),
  getHashtagCountWithinLimit: createSelector(
    (state: EditorState) => state.hashtags,
    (hashtags) => hashtags.length <= constants.instagram.hastagCountMax
  ),
};

const actionTypes: { [x in string]: string } = {
  ADD_HASHTAG: 'ADD_HASHTAG',
};

// actions
export const editorActions = {
  addHashTag: actionCreator<{ name: string }>(actionTypes.ADD_HASHTAG),
};

// TODO: move elsewhere
type Reducer<S> = (state: S, action: AnyAction) => S;

export const editorReducer: Reducer<EditorState> = (state, action) => {
  if (isType(action, editorActions.addHashTag)) {
    return produce(state, (draft) => {
      const { name } = action.payload;
      draft.hashtags.push(name);
    });
  }
};
