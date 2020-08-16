import React from 'react';
import classes from './Cockpit.css';

const cockpit = (props) => {
  const assignedClasses = [];
  console.log(assignedClasses);
  let btnClass = '';

  if(props.showPersons) {
    btnClass = classes.Red;
  }
  if(props.persons.length <= 2) {
    assignedClasses.push(classes.red); // classes ['red']
    console.log(assignedClasses);
  }
  if(props.persons.length <= 1) {
    assignedClasses.push(classes.bold); // classes ['red'] ['bold']
  }

  return(
    <div className={classes.Cockpit}>
      <h1>{props.title}</h1>
      <p className={assignedClasses.join(' ')}>Esto realmente funciona!</p>
      <button
        className={btnClass}
        onClick = {props.clicked}>Toggle Persons</button>
    </div>
  );
};

export default cockpit;
