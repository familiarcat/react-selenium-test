// Actions.
import * as actions from './actions';

export default function visibilityFilterReducer (state = 'all', action) {
  switch (action.type) {
  case actions.SET_FILTER:
    return action.payload.filter;

  default:
    return state;
  }
}
