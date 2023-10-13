import React, { Component } from 'react';
import { WrapImageGallery } from './ImageGallery.styled';
import { fetchImages } from '../../getDataImage';

export class ImageGallery extends Component {
  state = {
    gallery: [],
  };
  componentDidMount = () => {
    fetchImages(this.props.stringSearch, 1, 20).then(data => {
      this.setState({
        gallery: [...data.hits],
      });
    });
  };
  getImages = () => {
    return this.state.gallery.map(imgItem => {
      return (
        <img
          key={`${imgItem.id}`}
          width="300"
          src={`${imgItem.previewURL}`}
          alt={`${imgItem.tags}`}
          loading="lazy"
        />
      );
    });
  };
  render() {
    return <WrapImageGallery>{this.getImages()}</WrapImageGallery>;
  }
}
