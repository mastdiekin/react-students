import React, { Component } from "react";
import Aux from "../hoc/Auxx/Auxx";
import Header from "../UI/Header/Header";
import Hero from "../Hero/Hero";
import Footer from "../UI/Footer/Footer";
import Modal from "../UI/Modal/Modal";

class Home extends Component {
  render() {
    return (
      <Aux>
        {/* <Modal>
          Далеко-далеко за словесными горами в стране гласных и согласных живут
          рыбные тексты. Грустный свой страну ведущими грамматики,
          парадигматическая семь что она реторический текста это вопроса жизни
          взобравшись диких но силуэт которое продолжил.
        </Modal> */}
        <Header />
        <Hero />
        <Footer />
      </Aux>
    );
  }
}

export default Home;
