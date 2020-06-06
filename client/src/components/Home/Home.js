import React, { Component } from "react";
import Aux from "../hoc/Auxx/Auxx";
import Header from "../UI/Header/Header";
import Hero from "../Hero/Hero";
import Footer from "../UI/Footer/Footer";

class Home extends Component {
  componentDidMount() {
    document.title = "Home";
  }

  render() {
    return (
      <Aux>
        <Header />
        <Hero />
        <Footer />
      </Aux>
    );
  }
}

export default Home;
