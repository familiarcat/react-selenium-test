// Third party.
import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Paper, Divider, RaisedButton} from 'material-ui';

// Actions.
import * as CounterActions from 'stores/counter/actions';

export const CounterView = ({ counterValue, counterActions }) => {
  return (
    <div>
      <Paper style={{ padding : 15, textAlign : 'center' }}>
        <span>
          Counter: {counterValue}
        </span>
        <Divider style={{ marginTop : 15, marginBottom : 15 }} />
        <RaisedButton
          primary
          label="-"
          onTouchTap={counterActions.decrement} />
        <RaisedButton
          secondary
          label="Reset"
          onTouchTap={counterActions.reset} />
        <RaisedButton
          primary
          label="+"
          onTouchTap={counterActions.increment} />
      </Paper>
    </div>
  );
};

CounterView.propTypes = {
  counterValue   : PropTypes.number,
  counterActions : PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    counterValue : state.counter,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    counterActions : bindActionCreators(CounterActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CounterView);
