import React, { createContext, useContext, useReducer } from 'react';
import { DEFAULT_BUCKET } from '../utils/constants';
import { Action, Bucket } from '../types';

type BucketAction = SetBucketAction;

interface SetBucketAction {
  type: Action.SET;
  payload: Bucket;
}

interface State {
  bucket: Bucket;
}

const initialState = {
  bucket: DEFAULT_BUCKET,
};

// Define reducers
function reducer(state: State, action: BucketAction): State {
  switch (action.type) {
    case Action.SET:
      return { ...state, bucket: action.payload };
    default:
      return state;
  }
}

interface SelectedBucketContextInterface extends State {
  setBucket: (bucket: Bucket) => void;
}

const SelectedBucketContext =
  createContext<SelectedBucketContextInterface | null>(null);

export const useSelectedBucket = () => {
  const contextValue = useContext(SelectedBucketContext);

  if (!contextValue) {
    throw Error('Bucket context unavailable');
  }

  return contextValue;
};

function SelectedBucketProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = {
    bucket: state.bucket,
    setBucket: (bucket: Bucket) => {
      dispatch({ type: Action.SET, payload: bucket });
    },
  };

  return (
    <SelectedBucketContext.Provider value={value}>
      {children}
    </SelectedBucketContext.Provider>
  );
}

export default SelectedBucketProvider;
