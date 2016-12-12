// Third party.
import React, { PropTypes } from 'react';
import { ListItem, Checkbox } from 'material-ui';

const TodoItem = ({ completed, onToggleTodo, text }) => {
  const checkbox = (<Checkbox checked={completed} onCheck={onToggleTodo} />);

  return (
    <ListItem
      leftCheckbox={checkbox}
      primaryText={text}
      style={completed ? { textDecoration : 'line-through', color : '#ccc' } : {}}
      />
  );
};

TodoItem.propTypes = {
  completed    : PropTypes.bool,
  onToggleTodo : PropTypes.func,
  text         : PropTypes.string,
};

export default TodoItem;
