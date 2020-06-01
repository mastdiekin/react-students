import { Component } from "react";

class MyRedirect extends Component {
  state = {
    redirect: false,
    redirectHistory: false,
  };
  componentDidUpdate() {
    if (this.state.redirect) {
      this.state.redirectHistory.push(this.props.to);
    }
  }
  componentDidMount() {
    if (this.props.to) {
      this.setState({
        redirect: true,
        redirectHistory: this.props.redirectHistory,
      });
    }
  }
  render() {
    return null;
  }
}

export default MyRedirect;
