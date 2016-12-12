// Third party.
import { combineReducers } from 'redux';

// Reducers.
import counter          from './counter';
import todos            from './todos';
import visibilityFilter from './visibilityFilter';

export default combineReducers({
  counter,
  todos,
  visibilityFilter,
});
