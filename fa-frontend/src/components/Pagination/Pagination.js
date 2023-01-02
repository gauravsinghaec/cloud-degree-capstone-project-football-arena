import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Pagination extends Component {
  // Add PropTypes validation
  static propTypes = {
    page: PropTypes.number.isRequired,
    margin: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
  };

  // Add state as class property outside contructor
  state = {

  };

  componentWillReceiveProps(newProps) {
    if (newProps === this.props) return;
    const { margin, page, count } = newProps;
    const startPage = page > margin ? page - margin : 1;
    const endPage = page + margin > count ? count : page + margin;
    this.setState({ startPage, endPage, count });
  }

  onPageChange = (event) => {
    const index = Array.prototype.indexOf.call(event.target.parentNode.children, event.target);
    this.props.onPageChange(index + this.state.startPage);
  }

  goFirstPage = () => this.props.onPageChange(1);

  goLastPage = () => this.props.onPageChange(this.state.count);

  goPrevPage = () => this.props.onPageChange(this.props.page - 1);

  goNextPage = () => this.props.onPageChange(this.props.page + 1);

  render() {
    const { startPage, endPage, count } = this.state;
    const { page, margin } = this.props;
    const pages = [];
    const firstPage = page - margin > 1 ? (
      <button
        type="button"
        className="pagination-button pagination-end-button pagination-go-first"
        onClick={this.goFirstPage}
      >
        1
      </button>)
      : null;

    const lastPage = page + margin < count ? (
      <button
        type="button"
        className="pagination-button pagination-end-button pagination-go-last"
        onClick={this.goLastPage}
      >
        {count}
      </button>)
      : null;

    const prevPage = page === 1 ? null : (
      <button
        type="button"
        className="pagination-button"
        onClick={this.goPrevPage}
      >
        <i className="fas fa-angle-left fa-2x" />
      </button>);

    const nextPage = page === count ? null : (
      <button
        type="button"
        className="pagination-button"
        onClick={this.goNextPage}
      >
        <i className="fas fa-angle-right fa-2x" />
      </button>);

    for (let i = startPage; i <= endPage; i += 1) {
      pages.push(
        <button
          type="button"
          key={i}
          onClick={this.onPageChange}
          className={classnames('pagination-button', 'pagination-button-middle', {
            active: i === this.props.page,
          })}
        >
          {i}
        </button>,
      );
    }
    return (
      <div id="pagination-container">
        <div id="pagination">
          {prevPage}
          {firstPage}
          <div className="pagination-button-middle-container">
            {pages}
          </div>
          {lastPage}
          {nextPage}
        </div>
      </div>
    );
  }
}

export default Pagination;
