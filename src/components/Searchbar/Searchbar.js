import { InpSearch, WrapSearch } from './Searchbar.styled';

import React, { Component } from 'react';

export default class Searchbar extends Component {
  state = {
    strigSarch: '',
  };
  changeStrSearch = e => {
    console.log('e :>> ', e);
    console.log('e.currentTarget.value :>> ', e.currentTarget.value);
    this.setState({
      strigSarch: e.currentTarget.value,
    });
    this.props.newStrSearch();
  };
  render() {
    return (
      <WrapSearch>
        <InpSearch
          name="strigSarch"
          placeholder="item search"
          onClick={this.changeStrSearch}
        />
        ;
      </WrapSearch>
    );
  }
}
