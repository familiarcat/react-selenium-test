// Reducer & Actions.
import      counter from './';
import * as actions from './actions';

describe('DATA: Counter', () => {
  describe('the increment action', () => {
    let action;

    it(`should send ${actions.INCREMENT} to the reducer`, () => {
      action = actions.increment();
      expect(action).toEqual({
        type : actions.INCREMENT,
      });
    });

    it('should return the incremented state', () => {
      expect(counter(0, action)).toBe(1);
      expect(counter(17, action)).toBe(18);
    });
  });

  describe('the decrement action', () => {
    let action;

    it(`should send ${actions.DECREMENT} to the reducer`, () => {
      action = actions.decrement();
      expect(action).toEqual({
        type : actions.DECREMENT,
      });
    });

    it('should return the decremented state', () => {
      expect(counter(1, action)).toBe(0);
      expect(counter(17, action)).toBe(16);
    });
  });

  describe('the reset action', () => {
    let action;

    it(`should send ${actions.RESET} to the reducer`, () => {
      action = actions.reset();
      expect(action).toEqual({
        type : actions.RESET,
      });
    });

    it('should return the reseted store', () => {
      expect(counter(1, action)).toBe(0);
      expect(counter(17, action)).toBe(0);
    });
  });
});
