import { useEffect, useReducer, useState } from 'react';
import { post } from 'axios';

const dataFetchReducer = (state, { type, error }) => {
  switch (type) {
    case 'fetching': {
      return {
        ...state,
        error: null,
        fetching: true,
        success: false,
      };
    }
    case 'fetched': {
      return {
        ...state,
        error: null,
        fetching: false,
        success: true,
      };
    }
    case 'error': {
      return {
        ...state,
        error,
        fetching: false,
        success: false,
      };
    }
    default:
      throw new Error(`Unsupported type: ${type}`);
  }
};

const usePost = ({ url, data, content = 'application/json' }) => {
  const [send, setSend] = useState(false);
  const [state, dispatch] = useReducer(dataFetchReducer, {
    error: null,
    fetching: false,
    success: false,
  });

  useEffect(() => {
    if (send) {
      dispatch({ type: 'fetching' });
      post(url, data, {
        headers: {
          'Content-Type': content,
        },
      })
        .then(() => dispatch({ type: 'fetched' }))
        // eslint-disable-next-line sort-keys
        .catch(error => dispatch({ type: 'error', error }));
    }

    const cleanup = () => setSend(false);

    return cleanup();
  }, [send, url, data]);

  return [state, setSend];
};

export default usePost;
