// Third party.
import { createStore, applyMiddleware, compose } from 'redux';
import thunk                                     from 'redux-thunk';

// All reducers combined.
import rootReducer from 'stores';

export default function configureStore (initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  if (module.hot) {
    module.hot.accept('../stores', () => {
      store.replaceReducer(require('../stores').default);
    });
  }

  return store;
}
