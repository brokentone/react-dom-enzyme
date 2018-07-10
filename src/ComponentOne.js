import React, { Component } from 'react';

class ComponentOne extends Component {

  constructor() {
    super();
    this.state = { message: 'Silly component' };
  }

  componentDidUpdate() {
    setState({ message: 'Trix are for kids' + Math.random() })
  }

  render() {
    return (
      <ComponentTwo>{this.state.message}</ComponentTwo>
    );
  }
}

export default ComponentOne;
