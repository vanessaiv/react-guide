import React, { Component } from 'react';
import Persons from '../components/Persons/Persons';
import classes from './App.module.css';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';
import Auxiliary from '../hoc/Auxiliary';
import AuthContext from '../context/auth-context';

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
    showPersons: false,
    showCockpit: true,
    changeCounter: 0,
    authenticated: false
  }

  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }

  // componentWillMount() {
  //   console.log('[App.js] componentWillMount');
  // }

  componentDidMount() {
    console.log('[App.js] componentDidMount')
  }

  shouldComponentUpdate(nextProps, nextState){
    console.log('[App.js] shouldComponentUpdate');
    return true; //false prevents updating!!
  }

  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate');
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

    this.setState((prevState, props) => {
      return {
      persons: persons,
      changeCounter: prevState.changeCounter + 1
      };
    });
  }

  loginHandler = () => {
    this.setState({authenticated: true});
    console.log(this.state.authenticated);
  };

  render() {
    console.log('[App.js] render');
    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <Persons
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler}
          isAuthenticated={this.state.authenticated}/>
      );
    }

    return (
      <Auxiliary>
        <button onClick={() => {this.setState({showCockpit: false})}}>
          Remove Cockpit</button>
        <AuthContext.Provider
          value={{
            authenticated: this.state.authenticated,
            login: this.loginHandler}}>
          {this.state.showCockpit ? (
            <Cockpit
              title={this.props.appTitle}
              showPersons={this.state.showPersons}
              personsLength={this.state.persons.length}
              clicked={this.togglePersonsHandler}
            />)
            : null}
          {persons}
        </AuthContext.Provider>
      </Auxiliary>
    );
  }
}

export default withClass(App, classes.App);



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
