export const SET_FILTER = 'SET';
export function setFilter (filter) {
  return {
    type    : SET_FILTER,
    payload : {
      filter,
    },
  };
}
