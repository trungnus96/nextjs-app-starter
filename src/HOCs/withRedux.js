import { useMemo } from "react";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import root_reducer from "../reducers";

const middleware = [thunk];

// enhancers
const enhancers = [];

if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === "function") {
    enhancers.push(devToolsExtension());
  }
}

const composed_enhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
);

let store;

function initStore(initial_state) {
  return createStore(root_reducer, initial_state, composed_enhancers);
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore(initial_state) {
  const store = useMemo(() => initializeStore(initial_state), [initial_state]);
  return store;
}
