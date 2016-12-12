export const ADD = 'TODOS_ADD';
export function addTodo (text) {
  return {
    type    : ADD,
    payload : {
      text,
    },
  };
}

export const TOGGLE = 'TODOS_TOGGLE';
export function toggleTodo (id) {
  return {
    type    : TOGGLE,
    payload : {
      id,
    },
  };
}
