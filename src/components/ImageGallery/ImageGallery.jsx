import PropTypes from 'prop-types';
import { Ul } from './ImageGallery.styled';
import ImageGalleryItem from '../ImageGalleryItem';

const ImageGallery = ({ imagesArray, setImageLink, setShowModal }) => {
  return (
    <Ul>
      {imagesArray.map(image => (
        <ImageGalleryItem
          image={image}
          key={image.id}
          setShowModal={setShowModal}
          setImageLink={setImageLink}
        />
      ))}
    </Ul>
  );
};

ImageGallery.propTypes = {
  imagesArray: PropTypes.array.isRequired,
  setShowModal: PropTypes.func.isRequired,
  setImageLink: PropTypes.func.isRequired,
};

export default ImageGallery;
