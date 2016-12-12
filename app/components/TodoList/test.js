// Component.
import TodoList from './';

// Child components.
import TodoItem from '../TodoItem';

const setup = (
  todos       = [],
  onTodoClick = expect.createSpy()
) => {
  const props = { todos, onTodoClick };
  const component = shallowRender(<TodoList {...props} />);
  return { component, props };
};

describe('COMPONENT: <TodoList />', () => {
  it('should return a list of <TodoItem />s when have todos', () => {
    const { component } = setup([{
      id        : 1,
      text      : 'First todo',
      completed : false,
    }, {
      id        : 2,
      text      : 'Second todo',
      completed : true,
    }]);

    expect(component.props.children.length).toBe(2);
    component.props.children.map(item => expect(item.type).toBe(TodoItem));
  });

  it('should call onTodoClick when clicking on a <TodoItem />', () => {
    const { component, props } = setup([{
      id        : 1,
      text      : 'First todo',
      completed : false,
    }, {
      id        : 2,
      text      : 'Second todo',
      completed : true,
    }]);

    component.props.children[1].props.onToggleTodo();
    expect(props.onTodoClick).toHaveBeenCalledWith(2);
  });
});
