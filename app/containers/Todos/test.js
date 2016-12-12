// Component.
import { TodosView } from './';

// Child components.
import { Paper } from 'material-ui';
import TodoForm from 'components/TodoForm';
import ChangeFilter from 'components/ChangeFilter';
import TodoList from 'components/TodoList';

const setup = (
  todos = [],
  visibilityFilter = 'all',
  todoActions = {
    addTodo    : expect.createSpy(),
    toggleTodo : expect.createSpy(),
  },
  visibilityFilterActions = {
    setFilter : expect.createSpy(),
  }
) => {
  const props = { todos, visibilityFilter, todoActions, visibilityFilterActions  };
  const component = shallowRender(<TodosView {...props} />);
  return { component, props };
};

describe('VIEW: <TodosView />', () => {
  const todosMock = [{
    id   : 1,
    text : 'Buy the milk',
  }, {
    id        : 2,
    text      : 'Get a beer',
    completed : true,
  }, {
    id   : 3,
    text : 'Feed the dog',
  }, {
    id        : 4,
    text      : 'Feed the cats',
    completed : true,
  }, {
    id        : 5,
    text      : 'Listen music',
    completed : true,
  }];

  it('should render a <TodoForm />', () => {
    const { component } = setup();
    expect(component.props.children[0].type).toBe(TodoForm);
  });

  it('should render an <Alert /> when there is not Todos', () => {
    const { component } = setup();
    expect(component.props.children[1].type).toBe(Paper);
    expect(component.props.children[1].props.children).toBe('Have some fun! You have not todos.');
  });

  it('should render a <TodoList /> and three <ChangeFilter />s when there is Todos', () => {
    const { component } = setup(todosMock);
    const [ filters, todoList ] = component.props.children[1].props.children;

    filters.props.children.forEach(filter => expect(filter.type).toBe(ChangeFilter));
    expect(todoList.type).toBe(TodoList);
  });

  it('should show all todos when the visibility filter is all', () => {
    const { component } = setup(todosMock);
    expect(component.props.children[1].props.children[1].props.todos.length).toBe(5);
  });

  it('should show only pending todos when the visibility filter is uncompleted', () => {
    const { component } = setup(todosMock, 'uncompleted');
    expect(component.props.children[1].props.children[1].props.todos.length).toBe(2);
  });

  it('should show only completed todos when the visibility filter is completed', () => {
    const { component } = setup(todosMock, 'completed');
    expect(component.props.children[1].props.children[1].props.todos.length).toBe(3);
  });
});
