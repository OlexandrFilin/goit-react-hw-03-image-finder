import React, { Component } from 'react';
import {
  WrapImageGallery,
  BtnLoadMore,
  BtnWraper,
  MessageNoResult,
} from './ImageGallery.styled';
// import { fetchImages } from '../../getDataImage';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { spinerFunc } from '../Loader/Loader';

export class ImageGallery extends Component {
  getComponentImagesForRender = () => {
    return this.props.gallery.map(ImgItem => {
      return <ImageGalleryItem key={ImgItem.id} ImgItem={ImgItem} />;
    });
  };
  renderButon = renderLoadMore => {
    if (renderLoadMore) {
      console.log('render buton');
      return (
        <BtnWraper>
          <BtnLoadMore type="button" onClick={this.props.onLoadMore}>
            Load more
          </BtnLoadMore>
        </BtnWraper>
      );
    } else {
      console.log(' No render buton');
    }
  };

  renderResultQuery = (error, spiner, loadMore) => {
    if (error) {
      return <h2>Помилка запиту</h2>;
    }
    if (spiner) {
      console.log('отображаем спинер');
      return (
        <div>
          {spinerFunc()}
          <WrapImageGallery>
            {this.getComponentImagesForRender()}
          </WrapImageGallery>
          {this.renderButon(loadMore)}
        </div>
      );
    } else {
      console.log('не отображаем спинер');
      return (
        <div>
          <WrapImageGallery>
            {this.getComponentImagesForRender()}
          </WrapImageGallery>
          {this.renderButon(loadMore)}
        </div>
      );
    }
  };
  closeModal = () => {
    return false;
  };

  render() {
    // console.log('this.props.gallery.length :>> ', this.props.gallery.length);
    return this.props.gallery.length === 0 ? (
      <MessageNoResult>No result or empty query string </MessageNoResult>
    ) : (
      this.renderResultQuery(
        this.props.onError,
        this.props.onSpiner,
        this.props.onRenderLoadMore
      )
    );
  }
}
