import { isDev } from '../utils/envUtils';

import * as EditorDuck from '~/ducks/EditorDuck';
import { combineReducers, Reducer, actionLogger } from '~/utils/reducerUtils';

export interface RootState {
  editor: EditorDuck.EditorState;
}

export const RootInitialState: { [x in keyof RootState]: any } = {
  editor: EditorDuck.initialState,
};

export const RootReducer: Reducer<RootState> = (state, action) => {
  if (isDev) {
    // log all dispatched actions for deubugging
    actionLogger(action);
  }

  return combineReducers<RootState>({
    editor: EditorDuck.reducer,
  })(state, action);
};
