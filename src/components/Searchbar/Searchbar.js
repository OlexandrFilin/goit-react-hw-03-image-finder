import { InpSearch, WrapSearch } from './Searchbar.styled';

import React, { Component } from 'react';

export default class Searchbar extends Component {
  state = {
    stringSearch: '',
  };
  componentDidUpdate = () => {
    this.props.changeStringSearch(this.state.stringSearch);
  };
  changeStrSearch = e => {
    this.setState({
      stringSearch: e.currentTarget.value,
    });
  };
  render() {
    const { stringSearch } = this.state;
    const { changeStrSearch } = this;
    return (
      <WrapSearch>
        <InpSearch
          type="text"
          //autocomplete="off"
          //   autofocus
          value={stringSearch}
          placeholder="Search images and photos"
          name="stringSearch"
          onChange={changeStrSearch}
        />
        ;
      </WrapSearch>
    );
  }
}
