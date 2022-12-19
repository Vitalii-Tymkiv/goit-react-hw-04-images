import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, Modal } from './ImageModal.styled';

const modalRoot = document.querySelector('#modal-root');

export class ImageModal extends Component {
  static propTypes = {
    onCloseModal: PropTypes.func.isRequired,
    image: PropTypes.shape({
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }),
  };
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  handleBackDropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onCloseModal();
    }
  };

  render() {
    const { largeImageURL, tags } = this.props.image;
    return createPortal(
      <Overlay onClick={this.handleBackDropClick}>
        <Modal>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      </Overlay>,
      modalRoot
    );
  }
}
