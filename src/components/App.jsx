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
  spiner = false;
  loadImg = 0;
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
    console.log('prState.spiner :>> ', prState.spiner);
    console.log('this.state.spiner :>> ', this.state.spiner);

    try {
      if (prState.stringSearch !== this.state.stringSearch) {
        this.setState({
          page: 1,
        });
      }
      if (
        prState.stringSearch !== this.state.stringSearch ||
        prState.page !== this.state.page ||
        prState.error !== this.state.error
        // prState.spiner !== this.state.spiner
      ) {
        // console.log('qwery bekend');
        this.setState({
          spiner: true,
        });
        //     //якщо змінився рядко пошуку починаємо перегляд наступних картинок з 1 сторінки

        //     //запит на бекенд при оновленні сторінки
        fetchImages(
          this.state.stringSearch,
          this.state.page,
          this.per_page
        ).then(data => {
          this.loadImg = data.hits.length;

          if (this.state.page === 1) {
            console.log('спинер 1 фалсе');
            this.setState({
              gallery: [...data.hits],
              spiner: false,
            });

            this.setState({
              spiner: false,
            });
          } else {
            this.setState(() => {
              return {
                gallery: [...prState.gallery, ...data.hits],
              };
            });

            console.log('спинер 2 фалсе');
            this.setState({
              spiner: false,
            });
          }
        });
      }
    } catch (error) {
      this.setState({
        error: true,
      });
    } finally {
      //console.log('close spiner :>> ');
      // setTimeout(() => {
      // this.setState({
      //   spiner: false,
      // });
      // }, 1000);
    }
  };

  onLoadMore = () => {
    this.setState((prState, prProps) => {
      return { page: prState.page + 1 };
    });
  };
  RendrButtonLoadMore = () => {
    // console.log('this.loadImg :>> ', this.loadImg);
    if (this.loadImg < 12) {
      return false;
    } else {
      return true;
    }
  };

  render() {
    const { onSubmitForm, onLoadMore, RendrButtonLoadMore } = this;
    console.log('рендер Арр');
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
