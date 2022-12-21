import { useState, useEffect } from 'react';
import { Layout } from './UI/Layout';
import { GlobalStyle } from './GlobalStyle';
import { SearchBar } from './SearchBar';
import { ImageGalleryList } from './ImageGalleryList/ImageGalleryList';
import { Spinner } from './UI/Spinner';
import { Button } from './UI/Button';
import { Error } from './UI/Error';
import { fetchImg } from '../servises/APIservise';
import { scroll, scrollOptions } from '../servises/Scroll';

export const App = () => {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPhotos, setTotalPhotos] = useState(null);
  const [showButton, setShowButton] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');

  const handleSubmitSearchBar = query => {
    setQuery(query);
    setImages([]);
    setCurrentPage(1);
  };

  const handleLoadMore = () => {
    setCurrentPage(prevState => prevState + 1);
  };

  useEffect(() => {
    if (query === '') {
      return;
    }
    const loadItems = async () => {
      try {
        setIsLoading(true);
        const data = await fetchImg(query, currentPage);
        const usefullData = data.hits.map(
          ({ id, largeImageURL, tags, webformatURL }) => {
            return { id, largeImageURL, tags, webformatURL };
          }
        );
        setImages(prevState => [...prevState, ...usefullData]);
        setShowButton(
          currentPage < Math.ceil(data.totalHits / 12) ? true : false
        );
        setTotalPhotos(data.totalHits);
      } catch {
        setError(
          `"${query}" doesn't exist, or check your internet connection!`
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadItems();
  }, [query, currentPage]);

  useEffect(() => {
    scroll.scrollToBottom(scrollOptions);
  }, [images]);

  return (
    <Layout>
      <SearchBar onSubmit={handleSubmitSearchBar} />
      {error && <Error>{error}</Error>}
      {totalPhotos === 0 && <Error>{'Please, enter correct query!'}</Error>}
      {images.length > 0 && <ImageGalleryList images={images} />}
      {isLoading && <Spinner />}
      {showButton && <Button onClick={handleLoadMore} />}

      <GlobalStyle />
    </Layout>
  );
};
