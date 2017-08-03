import React, { Component } from 'react';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
class App extends Component {
  render() {
    return (
      <div>Hello World!</div>
    );
  }
}

export default App;
