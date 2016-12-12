// Reducer & actions.
import      todos   from './';
import * as actions from './actions';

describe('DATA: Todos', () => {
  describe('the addTodo action', () => {
    let action;

    it(`should send ${actions.ADD} to the reducer`, () => {
      action = actions.addTodo('Learn Redux');
      expect(action).toEqual({
        type    : actions.ADD,
        payload : {
          text : 'Learn Redux',
        },
      });
    });

    it('should return the added todo concatenated to the state', () => {
      const stateBefore = deepFreeze([]);
      const stateAfter = [{
        id        : 1,
        text      : 'Learn Redux',
        completed : false,
      }];

      expect(todos(stateBefore, action)).toEqual(stateAfter);
    });
  });

  describe('the toggleTodo action', () => {
    let action;

    it(`should send ${actions.TOGGLE} to the reducer`, () => {
      action = actions.toggleTodo(2);
      expect(action).toEqual({
        type    : actions.TOGGLE,
        payload : {
          id : 2,
        },
      });
    });

    it('should return the list of todos with the modified todo', () => {
      const stateBefore = deepFreeze([{
        id        : 1,
        text      : 'Learn Redux',
        completed : false,
      }, {
        id        : 2,
        text      : 'Go shopping',
        completed : false,
      }]);
      const stateAfter = [{
        id        : 1,
        text      : 'Learn Redux',
        completed : false,
      }, {
        id        : 2,
        text      : 'Go shopping',
        completed : true,
      }];

      expect(todos(stateBefore, action)).toEqual(stateAfter);
    });
  });
});
