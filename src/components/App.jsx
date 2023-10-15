import { ImageGallery } from './ImageGallery/ImageGallery';
import SearchBar from './Searchbar/Searchbar';
import { fetchImages } from '../getDataImage';
import React, { Component } from 'react';

export class App extends Component {
  state = {
    stringSearch: '',
    gallery: [],
    page: 1,
    error: false,
    spiner: true,
  };
  per_page = 12;
  spiner = true;
  totalHits = 0;
  //Функція прокидується в SеarchBar При зміні рядка пошуку та сабміті
  //в SеarchBar змінюємо стейт для нового рендеригку
  newStrSearch = newStr => {
    console.log('newStr :>> ', newStr);
    if (this.state.stringSearch !== newStr) {
      this.setState({
        stringSearch: newStr,
      });
    }
  };
  // для організації пошуку міняєму в стейті рядок для пошуку
  onSubmitForm = evt => {
    evt.preventDefault();
    //  console.log('evt :>> ', evt.target.stringSearch.value);
    this.setState({
      stringSearch: evt.target.stringSearch.value,
    });
    // this.props.changeStringSearch(this.state.stringSearch);
  };

  componentDidUpdate = (prProps, prState) => {
    // console.log('prState.error :>> ', prState.error);
    // console.log('this.state.error :>> ', this.state.error);
    // console.log('');
    // console.log('prState.page :>> ', prState.page);
    // console.log('this.state.page  :>> ', this.state.page);
    // console.log('');
    // console.log('prState.stringSearch :>> ', prState.stringSearch);
    // console.log('this.state.stringSearch  :>> ', this.state.stringSearch);

    try {
      if (
        prState.stringSearch !== this.state.stringSearch ||
        prState.page !== this.state.page ||
        prState.error !== this.state.error
      ) {
        // console.log('qwery bekend');
        this.setState({
          spiner: true,
        });
        //     //якщо змінився рядко пошуку починаємо перегляд наступних картинок з 1 сторінки
        if (prState.stringSearch !== this.state.stringSearch) {
          this.setState({
            page: 1,
          });
        }
        //     //запит на бекенд при оновленні сторінки
        fetchImages(
          this.state.stringSearch,
          this.state.page,
          this.per_page
        ).then(data => {
          console.log('data :>> ', data);
          if (this.state.page === 1) {
            this.setState({
              gallery: [...data.hits],
              // stringSearch: this.state.stringSearch,
              //page: 1,
              // spiner: false,
            });
          } else {
            this.setState(() => {
              return {
                gallery: [...prState.gallery, ...data.hits],
              };
            });
          }
        });
      }
    } catch (error) {
      this.setState({
        error: true,
      });
    } finally {
      this.spiner = false;
    }
  };

  onLoadMore = () => {
    this.setState((prState, prProps) => {
      return { page: prState.page + 1 };
    });
  };
  RendrButtonLoadMore = () => {
    if (this.state.gallery.length < 24) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const { onSubmitForm, onLoadMore, RendrButtonLoadMore } = this;

    return (
      <div>
        <SearchBar onSubmitForm={onSubmitForm} />
        <ImageGallery
          gallery={this.state.gallery}
          onLoadMore={onLoadMore}
          onError={this.state.error}
          onSpiner={this.spiner}
          onRenderLoadMore={RendrButtonLoadMore()}
        />
      </div>
    );
  }
}
