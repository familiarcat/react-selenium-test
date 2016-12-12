// Third party.
import React, { Component, PropTypes } from 'react';
import { TextField }                   from 'material-ui';

export default class TodoForm extends Component {

  static propTypes = {
    onAddTodo : PropTypes.func,
  };

  constructor (props) {
    super(props);
    this.state = {
      newTodoText : '',
    };
  }

  render () {
    return (
      <TextField
        fullWidth
        value={this.state.newTodoText}
        hintText="Example: Learn Redux"
        floatingLabelText="What needs to be done?"
        onChange={e => this.setState({ newTodoText : e.target.value })}
        onEnterKeyDown={this._onSubmit} />
    );
  }

  _onSubmit = () => {
    const value = this.state.newTodoText.trim();

    if (value.length) {
      this.props.onAddTodo(value);
      this.setState({ newTodoText : '' });
    }
  };

}
