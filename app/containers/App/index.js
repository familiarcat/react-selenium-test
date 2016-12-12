// Third party.
import React, { Component, PropTypes } from 'react';
import { AppBar, LeftNav, MenuItem }   from 'material-ui';

// Assets.
import './style.scss';

export default class AppView extends Component {

  static propTypes = {
    children : PropTypes.element,
  };

  static contextTypes = {
    history : PropTypes.object,
  };

  constructor (props) {
    super(props);
    this.state = {
      openLeftNav : false,
    };
  }

  render () {
    return (
      <div>
        <AppBar
          title="Redux training"
          zDepth={0}
          onLeftIconButtonTouchTap={() => this.setState({ openLeftNav : true })}/>

        <LeftNav
          docked={false}
          open={this.state.openLeftNav}
          onRequestChange={openLeftNav => this.setState({ openLeftNav })}>
          <MenuItem
            onTouchTap={this._leftNavItemClickHandler.bind(this, 'counter')}>Counter</MenuItem>
          <MenuItem
            onTouchTap={this._leftNavItemClickHandler.bind(this, 'todos')}>
            Todo List
          </MenuItem>
        </LeftNav>

        <div className="app__content">
          {this.props.children}
        </div>
      </div>
    );
  }

  _leftNavItemClickHandler = (route) => {
    const { history } = this.context;
    history.pushState(null, route);
    this.setState({ openLeftNav : false });
  };

}
