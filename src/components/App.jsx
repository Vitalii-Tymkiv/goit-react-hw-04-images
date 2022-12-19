import { Component } from 'react';
import { Layout } from './UI/Layout';
import { GlobalStyle } from './GlobalStyle';
import { SearchBar } from './SearchBar';
import { ImageGalleryList } from './ImageGalleryList/ImageGalleryList';
import { Spinner } from './UI/Spinner';
import { Button } from './UI/Button';
import { Error } from './UI/Error';
import { fetchImg } from '../servises/APIservise';
import { scroll, scrollOptions } from '../servises/Scroll';

const INITIAL_STATE = {
  images: [],
  currentPage: 1,
  isLoading: false,
  totalPhotos: null,
  showButton: false,
  error: null,
};

export class App extends Component {
  state = INITIAL_STATE;

  handleSubmitSearchBar = query => {
    this.setState({
      query,
      images: [],
      currentPage: 1,
    });
  };
  handleLoadMore = () => {
    this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
  };

  loadItems = async (query, currentPage) => {
    try {
      this.setState({ isLoading: true });
      const data = await fetchImg(query, currentPage);
      data.hits.map(({ id, largeImageURL, tags, webformatURL }) => {
        return this.setState(prevState => ({
          images: [
            ...prevState.images,
            { id, largeImageURL, tags, webformatURL },
          ],
          showButton:
            currentPage < Math.ceil(data.totalHits / 12) ? true : false,
        }));
      });
      this.setState({ totalPhotos: data.totalHits });
    } catch {
      this.setState({
        error: `"${query}" doesn't exist, or check your internet connection!`,
      });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  componentDidUpdate(_, prevState) {
    const { currentPage, images } = this.state;
    const { query } = this.state;

    if (prevState.query !== query || prevState.currentPage !== currentPage) {
      this.loadItems(query, currentPage);
    }
    if (prevState.query !== query) {
      this.setState(INITIAL_STATE);
    }
    if (prevState.images.length < images.length) {
      scroll.scrollToBottom(scrollOptions);
    }
  }

  render() {
    const { images, isLoading, error, totalPhotos, showButton } = this.state;

    return (
      <Layout>
        <SearchBar onSubmit={this.handleSubmitSearchBar} />
        {error && <Error>{error}</Error>}
        {totalPhotos === 0 && <Error> {'Please, enter correct query!'}</Error>}
        {images.length > 0 && <ImageGalleryList images={images} />}
        {isLoading && <Spinner />}
        {showButton && <Button onClick={this.handleLoadMore} />}
        <GlobalStyle />
      </Layout>
    );
  }
}
