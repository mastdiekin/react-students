import React, { Component } from "react";
import classes from "./Pagination.sass";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";

class Pagination extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.students !== this.props.students;
  }

  //   state = {
  //     currentPage: 1,
  //     nextPage: 2,
  //     prevPage: null,
  //   };

  pages = () => {
    const copyStudentsData = { ...this.props.studentsData };

    let p = [];
    for (let page = 1; page <= copyStudentsData.lastPage; page++) {
      const currPage = "/page/" + page;
      const disabled = copyStudentsData.currentPage === page ? true : null;
      p.push(
        <li key={page}>
          <a
            href={currPage}
            className={
              copyStudentsData.currentPage === page ? classes.active : null
            }
            disabled={copyStudentsData.currentPage === page ? true : null}
            onClick={(e) => this.clicked(e, page, disabled)}
          >
            {page}
          </a>
        </li>
      );
    }

    const nextPage = () => {
      const hasNextPage =
        copyStudentsData.postsPerPage * copyStudentsData.currentPage <
        copyStudentsData.totalItems;
      return hasNextPage ? (
        <li key={copyStudentsData.nextPage}>
          <a
            href={"/page/" + copyStudentsData.nextPage}
            onClick={(e) => this.clicked(e, copyStudentsData.nextPage, null)}
          >
            Вперед
          </a>
        </li>
      ) : (
        false
      );
    };
    const prevPage = () => {
      const hasPrevPage = copyStudentsData.currentPage > 1;
      return hasPrevPage ? (
        <li key={copyStudentsData.prevPage}>
          <a
            href={"/page/" + copyStudentsData.prevPage}
            onClick={(e) => this.clicked(e, copyStudentsData.prevPage, null)}
          >
            Назад
          </a>
        </li>
      ) : (
        false
      );
    };

    return (
      <ul>
        {prevPage()}
        {p}
        {nextPage()}
      </ul>
    );
  };

  clicked = (e, pageNum, status) => {
    e.preventDefault();
    // this.setState({
    //   currentPage: pageNum,
    // });
    //если это текущая страница, то при клике на нее не будем делать запрос
    return !status ? this.props.onGetDataByThisPage(pageNum) : null;
  };

  render() {
    return (
      <div className={classes.Pagination}>
        {this.props.students ? this.pages() : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    students: state.students.students,
    studentsData: state.students,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetDataByThisPage: (page) => dispatch(actions.initStudents(page)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
