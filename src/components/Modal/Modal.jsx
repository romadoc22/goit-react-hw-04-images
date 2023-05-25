import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Overlay, ModalContainer, Img } from './Modal.styled';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ imageLink, setShowModal }) => {
  useEffect(() => {
    const hanleKeyDown = event => {
      if (event.code === 'Escape') {
        setShowModal(false);
      }
    };

    document.addEventListener('keydown', hanleKeyDown);

    return () => {
      document.removeEventListener('keydown', hanleKeyDown);
    };
  }, [setShowModal]);

  const handleOverlayClick = event => {
    const { currentTarget, target } = event;
    if (currentTarget === target) {
      setShowModal(false);
    }
  };

  return createPortal(
    <div>
      <Overlay onClick={handleOverlayClick}>
        <ModalContainer>
          <Img src={imageLink} alt="" />
        </ModalContainer>
      </Overlay>
    </div>,
    modalRoot
  );
};

export default Modal;

// перевірка PropTypes
Modal.propTypes = {
  imageLink: PropTypes.string.isRequired,
  setShowModal: PropTypes.func.isRequired,
};
