import { ImageGallery } from './ImageGallery/ImageGallery';
import SearchBar from './Searchbar/Searchbar';

import React, { Component } from 'react';

export class App extends Component {
  state = {
    stringSearch: '',
  };
  //Функція прокидується в SеarchBar При зміні рядка пошуку та сабміті
  //в SеarchBar змінюємо стейт для нового рендеригку
  newStrSearch = newStr => {
    if (this.state.stringSearch !== newStr) {
      this.setState({
        stringSearch: newStr,
      });
    }
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
