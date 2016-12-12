// Component.
import AppView from './';

// Child components.
import { AppBar, LeftNav } from 'material-ui';

const setup = () => {
  const props = {  };
  const component = shallowRender(<AppView {...props} />);
  return { component, props };
};

describe('VIEW: <AppView />', () => {
  it('should render an <AppBar />, a <LeftNav /> and a <div>', () => {
    const { component } = setup();
    expect(component.props.children[0].type).toBe(AppBar);
    expect(component.props.children[1].type).toBe(LeftNav);
    expect(component.props.children[2].props.className).toBe('app__content');
  });

  it('should open the <LeftNav /> when clicking on the <AppBar /> icon', () => {
    const { component } = setup();
    expect(component.props.children[1].props.open).toBe(false);
    component.props.children[0].props.onLeftIconButtonTouchTap();
    component.render();
    expect(component.props.children[1].props.open).toBe(true);
  });
});
