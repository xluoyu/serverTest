import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../../store/actions/test';

function mapStateToProps(state) {
  return {
    todos: state.todos
  };
}

function mapDispatchToProps (dispatch) {
  return {
    addTodo: text => {
      dispatch(addTodo(text))
    }
  }
}

function My (props) {
  const [number, setNumber] = useState(0);
  const [text, setText] = useState('');
  return (
    <div>
      <p>{number}</p>
      <button onClick={() => setNumber(number + 1)}>加</button>
      <input type="text" onChange={(e) => setText(e.target.value)}/>
      <button onClick={() => props.addTodo(text)}>加</button>
      {
        props.todos.map((item, index) => {
          return (
          <p key={index}>{item.text}</p>
          )
        })
      }
    </div>
  )
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(My);