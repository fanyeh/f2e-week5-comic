import { Component } from 'react';
import PropTypes from 'prop-types';
class Toggler extends Component {
  static defaultProps = {
    on: false,
  };

  static propTypes = {
    children: PropTypes.func.isRequired,
    on: PropTypes.bool.isRequired,
  };

  state = { on: this.props.on, id: btoa(Date.now()) };

  toggle = () => {
    this.setState(({ on }) => ({ on: !on }));
  };

  toggleOff = e => {
    const { on, id } = this.state;
    if (e.target.id !== id && on) {
      this.setState({ on: false });
    }
  };

  componentDidMount() {
    window.addEventListener('click', this.toggleOff);
  }

  childProps = () => {
    return {
      id: this.state.id,
      on: this.state.on,
      toggle: this.toggle,
    };
  };

  render() {
    return this.props.children(this.childProps());
  }
}

export default Toggler;
