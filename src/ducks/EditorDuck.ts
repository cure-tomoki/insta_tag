import produce from 'immer';
import { createSelector } from 'reselect';
import actionCreatorFactory, { isType } from 'typescript-fsa';

import constants from '~/constants';
import { RootState } from '~/ducks';
import { Reducer } from '~/utils/reducerUtils';

const actionCreator = actionCreatorFactory('editor');

export interface EditorState {
  imageFile: File | null;
  exifData: Instatag.ExifData;
  hashtags: string[];
}

export const initialState: EditorState = {
  imageFile: null,
  exifData: {},
  hashtags: [],
};

export const selectors = {
  getImageFile: createSelector(
    (state: RootState) => state.editor.imageFile,
    (imageFile) => imageFile
  ),
  getHashtags: createSelector(
    (state: RootState) => state.editor.hashtags,
    (hashtags) => hashtags
  ),
  getHashtagCountWithinLimit: createSelector(
    (state: RootState) => state.editor.hashtags,
    (hashtags) => hashtags.length <= constants.instagram.hastagCountMax
  ),
  getExifData: createSelector(
    (state: RootState) => state.editor.exifData,
    (exifData) => exifData
  ),
};

const actionTypes = {
  SET_IMAGE_FILE: 'SET_IMAGE_FILE',
  SET_EXIF: 'SET_EXIF',
  ADD_HASHTAG: 'ADD_HASHTAG',
};

export const actions = {
  setImageFile: actionCreator<{ file: File }>(actionTypes.SET_IMAGE_FILE),
  setExif: actionCreator<{ exifData: Instatag.ExifData }>(actionTypes.SET_EXIF),
  addHashTag: actionCreator<{ name: string }>(actionTypes.ADD_HASHTAG),
};

export const reducer: Reducer<EditorState> = (state, action) => {
  if (isType(action, actions.setImageFile)) {
    return produce(state, (draft) => {
      const { file } = action.payload;
      draft.imageFile = file;
    });
  } else if (isType(action, actions.setExif)) {
    return produce(state, (draft) => {
      const { exifData } = action.payload;
      draft.exifData = exifData;
    });
  } else if (isType(action, actions.addHashTag)) {
    return produce(state, (draft) => {
      const { name } = action.payload;
      draft.hashtags.push(name);
    });
  } else {
    return state;
  }
};
