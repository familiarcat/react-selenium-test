// Third party.
import React, { PropTypes } from 'react';
import { List } from 'material-ui';

// UI Components/
import TodoItem from 'components/TodoItem';

const TodoList = ({ todos, onTodoClick }) => {
  return (
    <List>
      {todos.map(todo =>
        <TodoItem
          key={todo.id}
          {...todo}
          onToggleTodo={() => onTodoClick(todo.id)}
          />
      )}
    </List>
  );
};

TodoList.propTypes = {
  todos       : PropTypes.array,
  onTodoClick : PropTypes.func,
};

export default TodoList;
