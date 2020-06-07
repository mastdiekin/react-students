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
    value: "",
  };

  changeSearch = (e) => {
    this.props.onSearchChange({ [e.target.name]: e.target.value });
    this.setState({
      query: { [e.target.name]: e.target.value },
      value: e.target.value,
    });
  };

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.search.data !== this.state.data;
  }

  componentDidUpdate = () => {
    this.setState({
      ...this.state,
      data: this.props.search.data,
    });
  };

  clearSearchInput = () => {
    this.props.onSearchClear();
    this.setState({
      data: null,
      query: null,
      value: "",
    });
  };

  searchLinkClick = (id) => {
    this.clearSearchInput();
    this.props.onInitStudentInside(id);
  };

  render() {
    let renderSearchData = null;
    if (!this.props.loading) {
      let receivedData = this.state.data;
      if (receivedData) {
        renderSearchData = [];
        receivedData.map((item) => {
          let style = {
            backgroundImage: "url(" + item.photo + ")",
          };
          renderSearchData.push(
            <Link
              key={item._id}
              to={`/students/${item._id}`}
              className={classes.Search__result}
              onClick={() => this.searchLinkClick(item._id)}
            >
              <div className={classes.Search__info}>
                <div className={classes.Search__names}>
                  {item.name} {item.lName}
                </div>
                <span className={classes.Search__dateReceipt}>
                  Дата поступления: {item.dateReceipt}
                </span>
              </div>
              <span className={classes.Search__thumb} style={style}></span>
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
          value={this.state.value}
          placeholder="Поиск..."
          onChange={(e) => this.changeSearch(e)}
        />
        {renderSearchData && renderSearchData.length > 0 ? (
          <Aux>
            <div
              className={classes.Search__overlay}
              onClick={this.clearSearchInput}
            ></div>
            <div className={classes["Search__result-wrapper"]}>
              <div className={classes.Search__found}>
                Найдено: <strong>{renderSearchData.length}</strong> студентов
              </div>
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
    onSearchClear: () => dispatch(actions.searchClear()),
    onInitStudentInside: (id) => dispatch(actions.initStudentInside(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
