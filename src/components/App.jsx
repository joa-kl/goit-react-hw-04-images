import React, { Component, useState, useEffect } from "react";
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
      // const { query, pageNr } = this.state;
      if (query.trim() === '') {
        alert('Please, use search field! ')
      }
    
      toggleLoader();

      try {
        const request = await fetchImages(query, pageNr);
        // this.setState(({ images, pageNr }) => ({
        //   images: [...images, ...request],
        //   pageNr: pageNr + 1,
        setImages(prevImages => [...prevImages, ...request]);
      
        if (request.length === 0) {
          setError({ error: `${query} not found` })
        }
      } catch (err) {
        setError({ error: err });
      } finally {
        toggleLoader();
      }
    }
    getImages();
  }, [query, pageNr, toggleLoader]);

  

  const handleInputChange = evt => {
    // const { name, value } = evt.target;
    // this.setState({ [name]: value });
    setQuery(evt.currentTarget.value);
  };

  const handleSearchQuerySubmit = newSearch => {
    setQuery(newSearch);
    setImages([]);
    setPageNr(1);
    setError(null);
    setIsLoading(true);
  };

  
  // const onLoadMore = async() => {
  //   const response = await fetchImages(
  //     setQuery(),
  //     setPageNr(prevPage => prevPage + 1),
  //   );
  //   return {
  //     setImages([...images, ...response]),
  //     setPageNr(prevPage => prevPage + 1)
  //   };
  // }

   const onLoadMore = () => {
    setIsLoading(true);
    setPageNr(prevPage => prevPage + 1);
  };
  

  const onOpenModal = evt => {
    setLargeImageURL(evt.target.dataset.source );
    toggleModal(!isLoading);
  };

  const toggleLoader = () => {
    setIsLoading(!isLoading); 
    };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

    // const { query, images, largeImageURL, isLoading, showModal, error } = this.state;

    return (
      <div>
        <SearchBar
          onSubmit={handleSearchQuerySubmit}
          onSearchQueryChange={handleInputChange}
          value={query}
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