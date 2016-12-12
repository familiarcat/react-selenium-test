// Third party.
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Setup stores.
import setupStores from 'utils/setupStores';

// Needed for onTouchTap
// Can go away when react 1.0 release
injectTapEventPlugin();

// Views/Containers.
import AppView from 'containers/App';
import CounterView from 'containers/Counter';
import TodosView from 'containers/Todos';

// Setup the stores and pass the initial state.
const store = setupStores({});

render((
  <Provider store={store}>
    <Router history={createBrowserHistory()}>
      <Route path="/" component={AppView}>
        <Route path="counter" component={CounterView} />
        <Route path="todos" component={TodosView} />
        <IndexRoute component={CounterView} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('app'));
