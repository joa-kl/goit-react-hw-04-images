import React, { useState, useEffect } from "react";
import { SearchBar } from './SearchBar/SearchBar';
import { fetchImages } from "./api/api";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import Modal from "./Modal/Modal";
import { Loader } from "./Loader/Loader";


const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [pageNr, setPageNr] = useState(1);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(null);
  const [largeImageURL, setLargeImageURL] = useState("");
  const [tags, setTags] = useState("");
 
  // state = {
  //   images: [],
  //   isLoading: false,
  //   query: "",
  //   pageNr: 1,
  //   error: null,
  //   showModal: null,
  //   largeImageURL: "",
  // };

  // componentDidUpdate(_, prevState) {
  //   if (prevState.query !== this.state.query) {
  //     this.setState({
  //       images: [],
  //       pageNr: 1,
  //       error: null
  //     });
  //   }
  // }

  useEffect(() => {
    if (!query) return;

    const getImages = async () => {
      try {
        const request = await fetchImages(query, pageNr);

        if (request.length === 0) {
          setError(`${query} not found`);
        }
        setImages(prevImages => [...prevImages, ...request]);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    getImages();
  }, [query, pageNr]);



  const handleSearchQuerySubmit = newSearch => {
    setQuery(newSearch);
    setImages([]);
    setPageNr(1);
    setError(null);
    setIsLoading(true);
  };


   const onLoadMore = () => {
    setIsLoading(true);
    setPageNr(prevPage => prevPage + 1);
  };
  

  const onOpenModal = evt => {
    setLargeImageURL(evt.target.dataset.source );
    toggleModal(!isLoading);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };


    return (
      <div>
        <SearchBar
          onHandleSubmit={handleSearchQuerySubmit}
        />
        {error}
         {images.length > 0 && !error && (
          <ImageGallery images={images} onOpenModal={onOpenModal} />
        )}
        {isLoading && <Loader />}
        {!isLoading && images.length >= 12 && !error &&
          (<Button onLoadMore={onLoadMore} />)}
        {showModal && (
          <Modal
            onToggleModal={toggleModal}
            largeImageURL={largeImageURL}
            tags={tags}/>
        )}
      </div>
    );
  }


export default App;