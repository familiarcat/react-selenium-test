// Reducer & Actions.
import      visibilityFilter from './';
import * as actions          from './actions';

describe('DATA: Visibility Filter', () => {
  it('should return `all` as the default filter', () => {
    expect(visibilityFilter(undefined, {})).toBe('all');
  });

  describe('the setFilter action', () => {
    let action;

    it(`should send ${actions.SET_FILTER} to the reducer`, () => {
      action = actions.setFilter('completed');
      expect(action).toEqual({
        type    : actions.SET_FILTER,
        payload : {
          filter : 'completed',
        },
      });
    });

    it('should return the changed filter on the state', () => {
      expect(visibilityFilter(undefined, action)).toBe('completed');
    });
  });
});
