import { fromJS } from 'immutable';

import { IState } from './types';

export const loadState = (): IState | undefined => {
  try {
    const serializedState: string | null =
      typeof window !== 'undefined' ? sessionStorage.getItem('state') : null;

    if (serializedState === null) {
      return undefined;
    }

    return fromJS(JSON.parse(serializedState));
  } catch (error) {
    console.error('Load State Error:', error);

    return undefined;
  }
};

export const saveState = (state: IState) => {
  try {
    const serializedState: string = JSON.stringify(state);

    sessionStorage.setItem('state', serializedState);
  } catch (error) {
    console.error('Save State Error:', error);
  }
};
