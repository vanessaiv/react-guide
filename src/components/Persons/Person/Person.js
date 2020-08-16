import React from 'react';
import classes from './Person.css';

const person = (props) => {
  console.log('[Person.js] rendering...');
  return (
    <div className={classes.Person}>
      <p onClick={props.click}>Soy {props.name}! Tengo {props.age} años.</p>
      <p>{props.children}</p>
      <input type="text" onChange={props.changed}></input>
    </div>
  )
};

export default person;
