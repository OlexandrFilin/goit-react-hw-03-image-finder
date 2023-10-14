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
    spiner: true,
    error: false,
  };

  per_page = 12;
  componentDidMount = () => {
    console.log('mount :>> ');
    const {
      state: { lineForSearch, page },
      per_page,
    } = this;

    try {
      this.setState({
        spiner: true,
      });
      fetchImages(lineForSearch, page, per_page).then(data => {
        this.setState({
          gallery: [...data.hits],
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
  };

  spiner = () => {
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
        justifyContent="center"
      />
    );
  };

  componentDidUpdate = (prProps, prState) => {
    console.log('update gallery');

    if (
      prState.lineForSearch !== this.props.stringSearch ||
      prState.page !== this.state.page
    ) {
      console.log('Запуск оновлення');

      try {
        fetchImages(
          this.props.stringSearch,
          this.state.page,
          this.per_page
        ).then(data => {
          //якщо рядки
          if (prState.lineForSearch !== this.props.stringSearch) {
            console.log('update1  ');
            this.setState({
              gallery: [...data.hits],
              lineForSearch: this.props.stringSearch,
              page: 1,
            });
          } else {
            this.setState((prState, prProps) => {
              const ar = { ...prState.gallery, ...data.hits };
              console.log('update2  ');
              console.log('ar :>> ', ar);
              return {
                gallery: [...prState.gallery, ...data.hits],
                lineForSearch: this.props.stringSearch,
              };
            });
          }

          // this.setState({
          //   gallery: [...data.hits],
          //   lineForSearch: this.props.stringSearch,
          // });
        });
      } catch (error) {
        this.setState({
          error: true,
        });
      } finally {
        // this.setState({
        //   spiner: false,
        // });
      }
    }

    // console.log('this.state :>> ', this.state);
  };

  getImages = () => {
    // console.log('this.state.gallery :>> ', this.state.gallery);
    return this.state.gallery.map(ImgItem => {
      return <ImageGalleryItem key={ImgItem.id} ImgItem={ImgItem} />;
    });
  };

  clickLoadMore = () => {
    // console.log('clicButton :>> ');
    this.setState(prState => {
      return { page: prState.page + 1 };
    });
  };
  closeModal = () => {
    return false;
  };
  render() {
    console.log('render galery');
    if (!this.setState.error) {
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
          {this.state.spiner && this.spiner()}
        </div>
      );
    } else {
      return <p>Error</p>;
    }
  }
}
