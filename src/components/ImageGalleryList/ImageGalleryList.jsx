import PropTypes from 'prop-types';
import { Gallery } from './ImageGalleryList.styled';
import { ImageGalleryItem } from '../ImageGalleryItem';

export const ImageGalleryList = ({ images }) => {
  return (
    <Gallery>
      {images.map(image => {
        return <ImageGalleryItem key={image.id} image={image} />;
      })}
    </Gallery>
  );
};

ImageGalleryList.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
};
