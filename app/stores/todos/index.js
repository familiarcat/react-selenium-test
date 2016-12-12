// Actions.
import * as actions from './actions';

export default function todosReducer (state = [], action) {
  switch (action.type) {
  case actions.ADD:
    return state.concat({
      id        : state.length + 1,
      text      : action.payload.text,
      completed : false,
    });

  case actions.TOGGLE:
    return state.map((todo) => {
      if (todo.id !== action.payload.id) {
        return todo;
      }

      return Object.assign({}, todo, {
        completed : !todo.completed,
      });
    });

  default:
    return state;
  }
}
