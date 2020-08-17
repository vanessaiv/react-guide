import React, {useEffect, useRef, useContext} from 'react';
import classes from './Cockpit.module.css';
import AuthContext from '../../context/auth-context';

const cockpit = (props) => {
  const toggleBtnRef = useRef(null);
  const authContext = useContext(AuthContext);

  console.log(authContext.authenticated);

  useEffect(() => {
    console.log('[Cockpit.js] useEffect');
    //Fake http request:
    // setTimeout(() => {
    //   alert('Saved data to cloud!')
    // }, 1000);
    toggleBtnRef.current.click();
    return () => {
      console.log('[Cockpit.js] cleanup work with useEffect');
    }
  },
  //2nd argument for specifying WHEN to show the alert
  []);

  const assignedClasses = [];
  console.log(assignedClasses);
  let btnClass = '';

  if(props.showPersons) {
    btnClass = classes.Red;
  }
  if(props.personsLength <= 2) {
    assignedClasses.push(classes.red); // classes ['red']
    console.log(assignedClasses);
  }
  if(props.personsLength <= 1) {
    assignedClasses.push(classes.bold); // classes ['red'] ['bold']
  }

  return(
    <div className={classes.Cockpit}>
      <h1>{props.title}</h1>
      <p className={assignedClasses.join(' ')}>Esto realmente funciona!</p>
      <button
        ref={toggleBtnRef}
        className={btnClass}
        onClick = {props.clicked}>Toggle Persons</button>
      <button onClick={authContext.login}>Log in</button>
    </div>
  );
};

export default React.memo(cockpit);
