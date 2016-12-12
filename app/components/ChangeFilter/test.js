// Component.
import ChangeFilter from './';

const setup = (
  text,
  filter,
  activeFilter = null,
  onSetFilter  = expect.createSpy()
) => {
  const props = { activeFilter, filter, onSetFilter, text };
  const component = shallowRender(<ChangeFilter {...props} />);
  return { component, props };
};

describe('COMPONENT: <ChangeFilter />', () => {
  it('should render the passed text', () => {
    const { component } = setup('All');
    expect(component.props.label).toBe('All');
  });

  it('should disable the button when props.activeFilter is the same as the props.filter', () => {
    const { component } = setup('All', 'ALL', 'ALL');
    expect(component.props.disabled).toBe(true);
  });

  it('should enable the button when props.activeFilter is different as props.filter', () => {
    const { component } = setup('All', 'ALL', 'COMPLETED');
    expect(component.props.disabled).toBe(false);
  });

  it('should call onSetFilter when clicking on the link element', () => {
    const { component, props } = setup('All', 'MyFilter');
    component.props.onTouchTap();
    expect(props.onSetFilter).toHaveBeenCalledWith('MyFilter');
  });
});
