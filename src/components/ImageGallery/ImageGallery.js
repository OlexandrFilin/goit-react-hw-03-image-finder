import React, { Component } from 'react';

import {
  WrapImageGallery,
  BtnLoadMore,
  BtnWraper,
} from './ImageGallery.styled';
import { fetchImages } from '../../getDataImage';

export class ImageGallery extends Component {
  state = {
    gallery: [],
    lineForSearch: '',
    page: 1,
  };

  per_page = 12;
  componentDidMount = () => {
    console.log('mount :>> ');
    const {
      state: { lineForSearch, page },
      per_page,
    } = this;
    fetchImages(lineForSearch, page, per_page).then(data => {
      this.setState({
        gallery: [...data.hits],
      });
    });
  };

  componentDidUpdate = (prProps, prState) => {
    // console.log('update gallery');
    // console.log('this.state.page :>> ', this.state.page);
    // console.log('prState.page :>> ', prState.page);
    // const { props: stringSearch, state: page, per_page } = this;

    if (
      prState.lineForSearch !== this.props.stringSearch ||
      prState.page !== this.state.page
    ) {
      console.log('Запуск оновлення');
      fetchImages(this.props.stringSearch, this.state.page, this.per_page).then(
        data => {
          this.setState({
            gallery: [...data.hits],
            lineForSearch: this.props.stringSearch,
          });
        }
      );
    }

    console.log('this.state :>> ', this.state);
  };

  getImages = () => {
    return this.state.gallery.map(imgItem => {
      return (
        <img
          key={`${imgItem.id}`}
          width="300"
          height="200"
          src={`${imgItem.webformatURL}`}
          alt={`${imgItem.tags}`}
          loading="lazy"
        />
      );
    });
  };

  clickLoadMore = () => {
    console.log('clicButton :>> ');
    this.setState(prState => {
      return { page: prState.page + 1 };
    });
  };

  render() {
    console.log('render galery');
    return (
      <div>
        <WrapImageGallery>{this.getImages()}</WrapImageGallery>
        {this.state.gallery.length < 12 ? (
          <BtnWraper></BtnWraper>
        ) : (
          <BtnWraper>
            <BtnLoadMore type="button" onClick={this.clickLoadMore}>
              Load more
            </BtnLoadMore>
          </BtnWraper>
        )}
      </div>
    );
  }
}
