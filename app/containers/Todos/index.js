// Third party.
import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Paper } from 'material-ui';

// Actions.
import * as TodoActions from 'stores/todos/actions';
import * as VisibilityFilterActions from 'stores/visibilityFilter/actions';

// Assets.
import './style.scss';

// UI components.
import TodoForm from 'components/TodoForm';
import ChangeFilter from 'components/ChangeFilter';
import TodoList from 'components/TodoList';

export const TodosView = ({ todos, visibilityFilter, todoActions, visibilityFilterActions }) => {
  function getVisibleTodos () {
    switch (visibilityFilter) {
    case 'uncompleted' :
      return todos.filter(t => !t.completed);
    case 'completed' :
      return todos.filter(t => t.completed);
    default :
      return todos;
    }
  }

  return (
    <div>
      <TodoForm onAddTodo={todoActions.addTodo} />
      {!todos.length ?
        <Paper className="no-todos-alert">
          Have some fun! You have not todos.
        </Paper>
        :
        <div>
          <div style={{ textAlign : 'center' }}>
            <ChangeFilter
              activeFilter={visibilityFilter}
              filter="all"
              onSetFilter={visibilityFilterActions.setFilter}
              text="All" />
            <ChangeFilter
              activeFilter={visibilityFilter}
              filter="uncompleted"
              onSetFilter={visibilityFilterActions.setFilter}
              text="Pending" />
            <ChangeFilter
              activeFilter={visibilityFilter}
              filter="completed"
              onSetFilter={visibilityFilterActions.setFilter}
              text="Completed" />
          </div>
          <TodoList
            todos={getVisibleTodos()}
            onTodoClick={todoActions.toggleTodo} />
        </div>
      }
    </div>
  );
};

TodosView.propTypes = {
  todos                   : PropTypes.array,
  visibilityFilter        : PropTypes.string,
  todoActions             : PropTypes.object,
  visibilityFilterActions : PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    todos            : state.todos,
    visibilityFilter : state.visibilityFilter,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    todoActions             : bindActionCreators(TodoActions, dispatch),
    visibilityFilterActions : bindActionCreators(VisibilityFilterActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodosView);
