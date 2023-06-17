import React, { Component } from "react";
import { SearchBar } from './SearchBar/SearchBar';
import { fetchImages } from "./api/api";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Modal } from "./Modal/Modal";
import { Loader } from "./Loader/Loader";


export class App extends Component {
  state = {
    images: [],
    isLoading: false,
    query: "",
    pageNr: 1,
    error: null,
    showModal: null,
    largeImageURL: "",
  };

  componentDidUpdate(_, prevState) {
    if (prevState.query !== this.state.query) {
      this.setState({
        images: [],
        pageNr: 1,
        error: null
      });
    }
  }

  handleInputChange = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };

  handleSearchQuerySubmit = (evt) => {
    evt.preventDefault();
    this.getImages();
  };

  getImages = async () => {
    const { query, pageNr } = this.state;
    if (query.trim() === '') {
      alert('Please, use search field! ')
    }
    
    this.toggleLoader();

    try {
      const request = await fetchImages(query, pageNr);
      this.setState(({ images, pageNr }) => ({
        images: [...images, ...request],
        pageNr: pageNr + 1,
      }));
      if (request.length === 0) {
        this.setState({error: `${query} not found`})
      }
    } catch (err) {
      this.setState({ error: err });
    } finally {
      this.toggleLoader();
    }
  }

  onLoadMore = async() => {
    const response = await fetchImages(
      this.state.query,
      this.state.pageNr + 1
    );
    this.setState({
      images: [...this.state.images, ...response],
      pageNr: this.state.pageNr + 1,
    });
  };

  onOpenModal = evt => {
    this.setState({ largeImageURL: evt.target.dataset.source });
    this.toggleModal();
  };

  toggleLoader = () => {
    this.setState(({ isLoading }) => ({
      isLoading: !isLoading,
    }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { query, images, largeImageURL, isLoading, showModal, error } = this.state;

    return (
      <div>
        <SearchBar
          onSubmit={this.handleSearchQuerySubmit}
          onSearchQueryChange={this.handleInputChange}
          value={query}
        />
        {error}
         {images.length > 0 && !error && (
          <ImageGallery images={images} onOpenModal={this.onOpenModal} />
        )}
        {isLoading && <Loader />}
        {!isLoading && images.length >= 12 && !error &&
          (<Button onLoadMore={this.onLoadMore} />)}
        {showModal && (
          <Modal onToggleModal={this.toggleModal}
            largeImageURL={largeImageURL} />
        )}
      </div>
    );
  }
}

