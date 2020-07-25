import produce from 'immer';
import { createSelector } from 'reselect';
import actionCreatorFactory, { isType } from 'typescript-fsa';

import constants from '~/constants';
import { RootState } from '~/ducks';
import { Reducer } from '~/utils/reducerUtils';

const actionCreator = actionCreatorFactory('editor');

export interface EditorState {
  imageFile: File | null;
  imagePreviewURL: string | null;
  exifData: Instatag.ExifData;
  hashtags: string[];
}

export const initialState: EditorState = {
  imageFile: null,
  imagePreviewURL: null,
  exifData: {},
  hashtags: [],
};

export const selectors = {
  getImage: createSelector(
    (state: RootState) => ({
      file: state.editor.imageFile,
      previewURL: state.editor.imagePreviewURL,
    }),
    (image) => image
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
  SET_IMAGE: 'SET_IMAGE',
  SET_EXIF: 'SET_EXIF',
  ADD_HASHTAG: 'ADD_HASHTAG',
};

export const actions = {
  setImage: actionCreator<{ file: File; previewURL: string }>(
    actionTypes.SET_IMAGE
  ),
  setExif: actionCreator<{ exifData: Instatag.ExifData }>(actionTypes.SET_EXIF),
  addHashTag: actionCreator<{ name: string }>(actionTypes.ADD_HASHTAG),
};

export const reducer: Reducer<EditorState> = (state, action) => {
  if (isType(action, actions.setImage)) {
    return produce(state, (draft) => {
      const { file, previewURL } = action.payload;
      draft.imageFile = file;
      draft.imagePreviewURL = previewURL;
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
