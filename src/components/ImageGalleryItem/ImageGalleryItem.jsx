import { useState } from 'react';
import PropTypes from 'prop-types';
import { Item, Image } from './ImageGalleryItem.styled';
import { ImageModal } from '../UI/ImageModal';

export const ImageGalleryItem = ({ image }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Item>
        <Image
          src={image.webformatURL}
          alt={image.tags}
          onClick={() => {
            setShowModal(true);
          }}
        />
      </Item>
      {showModal && (
        <ImageModal
          image={image}
          onCloseModal={() => {
            setShowModal(false);
          }}
        />
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};
