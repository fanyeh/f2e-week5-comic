import React, { Component } from 'react';
import Header from './Header';
import Home from './Home';
import Reader from './Reader';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Reader />
      </div>
    );
  }
}

export default App;
