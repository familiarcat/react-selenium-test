// Component.
import TodoItem from './';

const setup = (
  text,
  completed    = false,
  id           = 0,
  onToggleTodo = expect.createSpy()
) => {
  const props = { id, completed, text, onToggleTodo };
  const component = shallowRender(<TodoItem {...props} />);
  return { component, props };
};

describe('COMPONENT: <TodoItem />', () => {
  it('should display the Todo text', () => {
    const { component } = setup('Testing Todo text');
    expect(component.props.primaryText).toBe('Testing Todo text');
  });

  it('should call onToggleTodo when clicking the item', () => {
    const { component, props } = setup('Testing Todo click');
    console.log();
    component.props.leftCheckbox.props.onCheck();
    expect(props.onToggleTodo).toHaveBeenCalled();
  });

  it('should disable the Todo if it is completed', () => {
    const { component } = setup('Testing Todo completed', true);
    expect(component.props.style).toEqual({ textDecoration : 'line-through', color : '#ccc' });
  });
});
