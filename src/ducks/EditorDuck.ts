import produce from 'immer';
import { createSelector } from 'reselect';
import actionCreatorFactory, { isType } from 'typescript-fsa';

import { RootState } from '~/ducks';
import { Reducer } from '~/utils/reducerUtils';

const actionCreator = actionCreatorFactory('editor');

export interface EditorState {
  imageFile: File | null;
  imagePreviewURL: string | null;
  exifData: Instatag.ExifData;
  exifText: string;
}

export const initialState: EditorState = {
  imageFile: null,
  imagePreviewURL: null,
  exifData: {},
  exifText: '',
};

export const selectors = {
  getImage: createSelector(
    (state: RootState) => ({
      file: state.editor.imageFile,
      previewURL: state.editor.imagePreviewURL,
    }),
    (image) => image
  ),
  getExifData: createSelector(
    (state: RootState) => state.editor.exifData,
    (exifData) => exifData
  ),
  getText: createSelector(
    (state: RootState) => state.editor.exifText,
    (exifText) => ({
      exifText,
    })
  ),
};

const actionTypes = {
  SET_IMAGE: 'SET_IMAGE',
  SET_EXIF: 'SET_EXIF',
  SET_EXIF_TEXT: 'SET_EXIF_TEXT',
};

export const actions = {
  setImage: actionCreator<{ file: File; previewURL: string }>(
    actionTypes.SET_IMAGE
  ),
  setExif: actionCreator<{ data: Instatag.ExifData; text: string }>(
    actionTypes.SET_EXIF
  ),
  setExifText: actionCreator<{ text: string }>(actionTypes.SET_EXIF_TEXT),
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
      const { data, text } = action.payload;
      draft.exifData = data;
      draft.exifText = text;
    });
  } else if (isType(action, actions.setExifText)) {
    return produce(state, (draft) => {
      const { text } = action.payload;
      draft.exifText = text;
    });
  } else {
    return state;
  }
};
