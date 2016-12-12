// TodoForm component.
import TodoForm from './';

const setup = (
  onAddTodo = expect.createSpy()
) => {
  const props = { onAddTodo };
  const component = shallowRender(<TodoForm {...props} />);
  return { component, props };
};

describe('COMPONENT: <TodoForm />', () => {
  it('should not call onAddTodo when pressing enter on the empty input', () => {
    const { component, props } = setup();
    component.props.onEnterKeyDown();
    expect(props.onAddTodo).toNotHaveBeenCalled();
  });

  it('should call onAddTodo when pressing enter on the input', () => {
    const { component, props } = setup();
    component.props.onChange({ target : { value : 'Adding a Todo' } });
    component.props.onEnterKeyDown();
    expect(props.onAddTodo).toHaveBeenCalledWith('Adding a Todo');
  });

  it('should clean the input after calling onAddTodo', () => {
    const { component } = setup();
    component.props.onChange({ target : { value : 'Adding a Todo' } });
    component.props.onEnterKeyDown();
    component.render();
    expect(component.props.value).toBe('');
  });
});
