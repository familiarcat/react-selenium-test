// Actions.
import * as actions from './actions';

export default function counterReducer (state = 0, action) {
  switch (action.type) {
  case actions.INCREMENT:
    return state + 1;

  case actions.DECREMENT:
    return state - 1;

  case actions.RESET:
    return 0;

  default:
    return state;
  }
}
