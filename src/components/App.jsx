import { ImageGallery } from './ImageGallery/ImageGallery';
import SearchBar from './Searchbar/Searchbar';

import React, { Component } from 'react';

export class App extends Component {
  state = {
    stringSearch: '',
  };
  newStrSearch = newStr => {
    if (this.state.stringSearch !== newStr) {
      console.log(' update state APP');
      this.setState({
        stringSearch: newStr,
      });
    }
  };
  getNewSting = newStr => {
    console.log('newStr :>> ', newStr);
    return newStr;
  };
  render() {
    return (
      <div>
        <SearchBar changeStringSearch={this.newStrSearch} />
        <ImageGallery stringSearch={this.state.stringSearch} />
      </div>
    );
  }
}
