import produce from 'immer';
import { createSelector } from 'reselect';
import actionCreatorFactory, { isType } from 'typescript-fsa';

import constants from '~/constants';
import { RootState } from '~/ducks';
import { Reducer } from '~/utils/reducerUtils';

const actionCreator = actionCreatorFactory('editor');

export interface EditorState {
  hashtags: string[];
}

export const initialState: EditorState = {
  hashtags: [],
};

export const selectors = {
  getHashtags: createSelector(
    (state: RootState) => state.editor.hashtags,
    (hashtags) => hashtags
  ),
  getHashtagCountWithinLimit: createSelector(
    (state: RootState) => state.editor.hashtags,
    (hashtags) => hashtags.length <= constants.instagram.hastagCountMax
  ),
};

const actionTypes: { [x in string]: string } = {
  ADD_HASHTAG: 'ADD_HASHTAG',
};

export const actions = {
  addHashTag: actionCreator<{ name: string }>(actionTypes.ADD_HASHTAG),
};

export const reducer: Reducer<EditorState> = (state, action) => {
  if (isType(action, actions.addHashTag)) {
    return produce(state, (draft) => {
      const { name } = action.payload;
      draft.hashtags.push(name);
    });
  }
};
