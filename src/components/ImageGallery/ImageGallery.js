import React, { Component } from 'react';
import {
  WrapImageGallery,
  BtnLoadMore,
  BtnWraper,
} from './ImageGallery.styled';
import { fetchImages } from '../../getDataImage';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { CirclesWithBar } from 'react-loader-spinner';

export class ImageGallery extends Component {
  state = {
    gallery: [],
    lineForSearch: '',
    page: 1,
    spiner: false,
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
        spiner: false,
      });
    });
  };

  spiner = () => {
    console.log('spiner', this.state.spiner);
    if (this.state.spiner) {
      console.log('spiner');
      return (
        <CirclesWithBar
          height="100"
          width="100"
          color="#4fa94d"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          outerCircleColor=""
          innerCircleColor=""
          barColor=""
          ariaLabel="circles-with-bar-loading"
        />
      );
    }
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
      // this.setState({
      //   spiner: true,
      // });
      fetchImages(this.props.stringSearch, this.state.page, this.per_page).then(
        data => {
          this.setState({
            gallery: [...data.hits],
            lineForSearch: this.props.stringSearch,
            //spiner: false,
          });
        }
      );
    }

    console.log('this.state :>> ', this.state);
  };

  getImages = () => {
    console.log('this.state.gallery :>> ', this.state.gallery);
    return this.state.gallery.map((ImgItem, ind) => {
      return <ImageGalleryItem ImgItem={ImgItem} id={ind} />;
    });
  };

  clickLoadMore = () => {
    console.log('clicButton :>> ');
    this.setState(prState => {
      return { page: prState.page + 1 };
    });
  };
  closeModal = () => {
    return false;
  };
  render() {
    console.log('render galery');
    return (
      <div>
        {this.spiner()}
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
