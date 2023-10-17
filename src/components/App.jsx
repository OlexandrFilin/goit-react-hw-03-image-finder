import { ImageGallery } from './ImageGallery/ImageGallery';
import SearchBar from './Searchbar/Searchbar';
import { fetchImages } from '../getDataImage';
import React, { Component } from 'react';
import { BtnWraper, BtnLoadMore } from './App.styled';

export class App extends Component {
  state = {
    stringSearch: '',
    gallery: [],
    page: 1,
    error: false,
    spiner: true,
  };

  loadImg = 0;
  //Функція прокидується в SеarchBar При зміні рядка пошуку та сабміті
  //в SеarchBar змінюємо стейт для нового рендеригку
  newStrSearch = newStr => {
    if (this.state.stringSearch !== newStr) {
      this.setState({
        stringSearch: newStr,
      });
    }
  };
  // для організації пошуку міняєму в стейті рядок для пошуку
  onSubmitForm = evt => {
    evt.preventDefault();

    this.setState({
      stringSearch: evt.target.stringSearch.value,
      page: 1,
    });
  };

  componentDidUpdate = (prProps, prState) => {
    const {
      state: { stringSearch, page },
    } = this;
    if (prState.stringSearch !== stringSearch || prState.page !== page) {
      this.setState({
        spiner: true,
      });

      try {
        fetchImages(stringSearch, page).then(data => {
          const totalHits = data.totalHits;
          this.setState(prState => {
            return {
              gallery: [...prState.gallery, ...data.hits],
              loadMore: page < Math.ceil(totalHits / 12),
            };
          });
        });
      } catch (error) {
        this.setState({
          error: true,
        });
      } finally {
        this.setState({
          spiner: false,
        });
      }
    }
  };

  onLoadMore = () => {
    this.setState(prState => {
      return { page: prState.page + 1 };
    });
  };

  renderButon = renderLoadMore => {
    if (renderLoadMore) {
      return (
        <BtnWraper>
          <BtnLoadMore type="button" onClick={this.onLoadMore}>
            Load more
          </BtnLoadMore>
        </BtnWraper>
      );
    } else {
    }
  };

  render() {
    const {
      onSubmitForm,
      onLoadMore,
      state: { gallery, error, spiner, loadMore },
    } = this;

    return (
      <div>
        <SearchBar onSubmitForm={onSubmitForm} />
        <ImageGallery
          gallery={gallery}
          onLoadMore={onLoadMore}
          onError={error}
          onSpiner={spiner}
        />
        {this.renderButon(loadMore)}
      </div>
    );
  }
}
