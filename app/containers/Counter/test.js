// Component.
import { CounterView } from './';

const setup = (
  counterValue = 0,
  counterActions = {
    decrement : expect.createSpy(),
    reset     : expect.createSpy(),
    increment : expect.createSpy(),
  }
) => {
  const props = { counterValue, counterActions };
  const component = shallowRender(<CounterView {...props} />);
  return { component, props };
};

describe('VIEW: <CounterView />', () => {
  it('should render the passed counter value', () => {
    const { component } = setup(10);
    expect(component.props.children.props.children[0].props.children).toEqual([ 'Counter: ', 10 ]);
  });

  it('should call counterActions.decrement when clicking the [-] button', () => {
    const { component, props } = setup();
    component.props.children.props.children[2].props.onTouchTap();
    expect(props.counterActions.decrement).toHaveBeenCalled();
  });

  it('should call counterActions.reset when clicking the [Reset] button', () => {
    const { component, props } = setup();
    component.props.children.props.children[3].props.onTouchTap();
    expect(props.counterActions.reset).toHaveBeenCalled();
  });

  it('should call counterActions.increment when clicking the [+] button', () => {
    const { component, props } = setup();
    component.props.children.props.children[4].props.onTouchTap();
    expect(props.counterActions.increment).toHaveBeenCalled();
  });
});
