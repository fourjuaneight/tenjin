import { useEffect, useReducer, useState } from 'react';
import { post } from 'axios';

type State =
  | { fetching: boolean }
  | { fetching: boolean; succes: boolean }
  | { fetching: boolean; succes: boolean; error: string };

type Action =
  | { type: 'fetching' }
  | { type: 'fetched' }
  | { type: 'error'; error: string };

interface HookProps {
  url: string;
  data: object;
  content: string;
  headers?: object | null;
}

/**
 * Reducer function to determine active request state
 * @function
 *
 * @param   {object} state     takes in default state from the Reducer
 * @param   {string} type      type of state in the request process
 * @param   {string} error     error message when present
 * @returns {object}           error (if any), fetching state, query type (resNum || rates), success (if passed)
 */
const dataFetchReducer = (state: State, action: Action): State => {
  switch (action.type) {
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
        error: action.error,
        fetching: false,
        success: false,
      };
    }
    default:
      throw new Error(`Unsupported type: ${action.type}`);
  }
};

/**
 * Custom Hook for making async API requests
 * @function
 *
 * @param   {string} url     API endpoint
 * @param   {string} data    request body
 * @param   {string} content request content type
 * @param   {object} headers additional request headers
 * @returns {array}          state object, send switch (make request only while true; prevents endless loop in component lifecycle)
 */
const usePost = ({
  url,
  data,
  content = 'application/json',
  headers,
}: HookProps) => {
  // request will only go through while true
  const [send, setSend] = useState<boolean>(false);
  // state management
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
          ...headers,
        },
      })
        .then(() => dispatch({ type: 'fetched' }))
        // eslint-disable-next-line sort-keys
        .catch(error => dispatch({ type: 'error', error }));
    }

    const cleanup = () => setSend(false);

    // switch send state to false to prevent endless loop
    return cleanup();
  }, [send, url, data]);

  return [state, setSend];
};

export default usePost;
