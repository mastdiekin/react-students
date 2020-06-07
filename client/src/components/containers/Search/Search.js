import React, { Component } from "react";
import classes from "./Search.sass";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { Link } from "react-router-dom";
import Aux from "../../hoc/Auxx/Auxx";

class Search extends Component {
  state = {
    data: null,
    query: null,
  };

  changeSearch = (e) => {
    this.props.onSearchChange({ [e.target.name]: e.target.value });
    this.setState({ query: { [e.target.name]: e.target.value } });
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.search.data !== this.state.data
      //   nextState.data !== this.state.data
    );
  }

  //   componentWillReceiveProps(nextState, nextProps) {
  //     this.setState({ data: this.props.search.data });
  //     // if (nextState.search.data) {
  //     //   console.log(nextState.search.data);
  //     // }
  //   }

  componentDidUpdate = () => {
    this.setState({ data: this.props.search.data });
    // if (!this.props.loading) {
    //   const receivedData = this.props.search.data;
    //   if (receivedData) {
    //     console.log(nextState);
    //   }
    // }
  };

  clearSearchInput = () => {
    console.log("CLEAR");
    this.setState({ data: null });
  };

  render() {
    let renderSearchData;
    if (!this.props.loading) {
      let receivedData = this.state.data;
      if (receivedData) {
        let mapData = receivedData.map((item) => {
          renderSearchData = (
            <Link
              to={`/students/${item._id}`}
              className={classes.Search__result}
            >
              {item.name} {item.lName}
            </Link>
          );
        });
      }
    }

    return (
      <div className={classes.Search}>
        <input
          type="text"
          name="query"
          onChange={(e) => this.changeSearch(e)}
        />
        {renderSearchData ? (
          <Aux>
            <div
              className={classes.Search__overlay}
              onClick={this.clearSearchInput}
            ></div>
            <div className={classes["Search__result-wrapper"]}>
              {renderSearchData}
            </div>
          </Aux>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    search: state.search,
    loading: state.search.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (query) => dispatch(actions.searchChange(query)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
