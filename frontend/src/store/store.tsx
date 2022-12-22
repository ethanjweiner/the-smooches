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

const SelectedBucketContext = createContext({
  bucket: DEFAULT_BUCKET,
  setBucket: (_: Bucket) => {
    _;
    return;
  },
});

export const useSelectedBucket = () => useContext(SelectedBucketContext);

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
