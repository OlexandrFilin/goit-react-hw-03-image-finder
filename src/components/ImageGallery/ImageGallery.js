import React, { Component } from 'react';
import {
  WrapImageGallery,
  BtnLoadMore,
  BtnWraper,
} from './ImageGallery.styled';
import { fetchImages } from '../../getDataImage';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { spinerFunc } from '../Loader/Loader';

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
    const {
      state: { lineForSearch, page },
      per_page,
    } = this;

    try {
      this.setState({
        spiner: true,
      });
      //запит на бекенд при першому завантаженні сторінки
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

  componentDidUpdate = (prProps, prState) => {
    if (
      prState.lineForSearch !== this.props.stringSearch ||
      prState.page !== this.state.page
    ) {
      try {
        //запит на бекенд при оновленні сторінки
        fetchImages(
          this.props.stringSearch,
          this.state.page,
          this.per_page
        ).then(data => {
          //якщо елемент в стейті що містить рядок пошуку змінився обнуляємо стейнт

          if (prState.lineForSearch !== this.props.stringSearch) {
            this.setState({
              gallery: [...data.hits],
              lineForSearch: this.props.stringSearch,
              page: 1,
              spiner: false,
            });
          } else {
            //інакше додаємо до вже відрендерених каритнок ще порцію
            this.setState((prState, prProps) => {
              return {
                gallery: [...prState.gallery, ...data.hits],
                lineForSearch: this.props.stringSearch,
                spiner: false,
              };
            });
          }
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
  };

  getComponentImagesForRender = () => {
    return this.state.gallery.map(ImgItem => {
      return <ImageGalleryItem key={ImgItem.id} ImgItem={ImgItem} />;
    });
  };

  clickLoadMore = () => {
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
          {this.state.spiner && spinerFunc()}
          <WrapImageGallery>
            {this.getComponentImagesForRender()}
          </WrapImageGallery>
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
    } else {
      return <p>Error</p>;
    }
  }
}
