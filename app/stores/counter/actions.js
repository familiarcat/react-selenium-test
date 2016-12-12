export const INCREMENT = 'COUNTER_INCREMENT';
export function increment () {
  return {
    type : INCREMENT,
  };
}

export const DECREMENT = 'COUNTER_DECREMENT';
export function decrement () {
  return {
    type : DECREMENT,
  };
}

export const RESET = 'COUNTER_RESET';
export function reset () {
  return {
    type : RESET,
  };
}
