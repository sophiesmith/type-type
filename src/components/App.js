import React, { Component } from 'react';
import './App.css';
import './button.css'
import {Button} from './Button'
import {setUrl} from 'redux-effects-location'
import {connect} from 'react-redux'
import NavBar from './NavBar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar/>
        <header className="App-header">
          <h1 className="App-title">type type revolution</h1>
        </header>
        <div className="App-buttons">
          <Button type="main-button" text="TYPE NOW" handleClick={() => this.props.setUrl('/difficulty')}/>
          <Button type="secondary-button" id="login" text="Log In"/>
          <Button type="secondary-button" id="signup" text="Sign Up"/>
        </div>
      </div>
    );
  }
}

export default connect(() => {}, {setUrl})(App);
