import React, { Component } from 'react';
import Persons from '../components/Persons/Persons';
import classes from './App.css';
import Cockpit from '../components/Cockpit/Cockpit';

class App extends Component {
  constructor(props) {
    super(props);
    console.log('[App.js] constructor');
  }

  state = {
    persons: [
      {id: 'sjda1', name: "Vanessa", age:24},
      {id: 'dqfs1', name: "Viry", age: 24},
      {id: 'fmkd1', name: "Addy", age: 24}
    ],
    otherState: 'some other value',
    showPersons: false
  }

  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }

  componentWillMount() {
    console.log('[App.js] componentWillMount');
  }

  componentDidMount() {
    console.log('[App.js] componentDidMount')
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  deletePersonHandler = (personIndex) => {
    //const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  switchNamesHandler = (newName) => {
    //console.log("You clicked me!")
    //DON'T DO THIS: this.state.persons[0].name = "Vane"
    this.setState({
      persons: [
        {name: newName, age:24},
        {name: "Viry", age: 24},
        {name: "Addy", age: 29}]
      })
  }

  nameChangedHandler = (event, id) =>{
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {...this.state.persons[personIndex]};
    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({
      persons: persons
      })
  }

  render() {
    console.log('[App.js] render');
    let persons = null;

    if (this.state.showPersons) {
      persons = <Persons
        persons={this.state.persons}
        clicked={this.deletePersonHandler}
        changed={this.nameChangedHandler} />
    }

    return (
      <div className={classes.App}>
        <Cockpit
          title={this.props.appTitle}
          showPersons={this.state.showPersons}
          persons={this.state.persons}
          clicked={this.togglePersonsHandler}/>
        {persons}
      </div>
    );
  }
}

export default App;



// import React, { useState } from 'react';
// import logo from './logo.svg';
// import './App.css';
// import Person from './Person/Person';
//
// const App = props => {
//   const [personsState, setPersonsState] = useState({
//     persons: [
//       {name: "Vanessa", age:24},
//       {name: "Viry", age: 24},
//       {name: "Addy", age: 24}
//     ]
//   })
//
//   const switchNamesHandler = () => {
//     //console.log("You clicked me!")
//     //DON'T DO THIS: this.state.persons[0].name = "Vane"
//     setPersonsState({
//       persons: [
//         {name: "Vane", age:24},
//         {name: "Viry", age: 24},
//         {name: "Addy", age: 29}
//     ]})
//   }
//
//     return (
//       <div className="App">
//         <h1>Soy una app de react!!!</h1>
//         <button onClick = {switchNamesHandler}>Click me!</button>
//         <Person name={personsState.persons[0].name} age={personsState.persons[0].age}>Me gusta leer</Person>
//         <Person name={personsState.persons[1].name} age={personsState.persons[1].age}/>
//         <Person name={personsState.persons[2].name} age={personsState.persons[2].age}/>
//       </div>
//     );
//
//     //return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Soy una app de react!!!'));
// }
//
// export default App;
