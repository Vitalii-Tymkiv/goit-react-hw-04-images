import { Component } from 'react';
import PropTypes from 'prop-types';
import { Item, Image } from './ImageGalleryItem.styled';
import { ImageModal } from '../UI/ImageModal';

export class ImageGalleryItem extends Component {
  static propTypes = {
    image: PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }).isRequired,
  };
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { image } = this.props;
    const { showModal } = this.state;

    return (
      <>
        <Item>
          <Image
            src={image.webformatURL}
            alt={image.tags}
            onClick={this.toggleModal}
          />
        </Item>
        {showModal && (
          <ImageModal image={image} onCloseModal={this.toggleModal} />
        )}
      </>
    );
  }
}
