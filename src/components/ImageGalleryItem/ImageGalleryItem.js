import React, { Component } from 'react';
import { ImageGalleryItemInp } from './ImageGalleryItem.styled';
import { ModalWindow } from 'components/Modal/Modal';

export default class ImageGalleryItem extends Component {
  state = {
    showmodal: false,
  };
  onCloseModal = () => {
    this.setState({
      showmodal: false,
    });
  };
  onOpenModal = () => {
    this.setState({
      showmodal: true,
    });
  };
  render() {
    //const { id, webformatURL, tags } = this.props.ImgItem;
    return (
      <div>
        <ImageGalleryItemInp
          width="300"
          height="200"
          src={`${this.props.ImgItem.webformatURL}`}
          alt={`${this.props.ImgItem.tags}`}
          loading="lazy"
          onClick={this.onOpenModal}
        />
        <ModalWindow
          showModal={this.state.showmodal}
          onCloseModal={this.onCloseModal}
          tags={this.props.tags}
          image={this.props.ImgItem.largeImageURL}
        ></ModalWindow>
      </div>
    );
  }
}
