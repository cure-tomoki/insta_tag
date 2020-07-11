import produce from 'immer';
import { AnyAction } from 'typescript-fsa';

export type Reducer<S = any> = (state: S, action: AnyAction) => S;

export const combineReducers = function <S>(
  reducerMap: { [x in keyof S]: Reducer }
): Reducer<S> {
  return (state, action) =>
    produce(state, (draft) => {
      const keys = Object.keys(reducerMap) as Array<keyof typeof reducerMap>;
      for (let i = 0; i < keys.length; i++) {
        const invoke = reducerMap[keys[i]](state[keys[i]], action);
        // @ts-ignore
        draft[keys[i]] = invoke;
      }
    });
};

export const actionLogger = (action: AnyAction): void => {
  // TODO: make log text fancy (aka easy to read)
  console.log(action);
};
