import css from '../Styles.module.css';
import propTypes from 'prop-types';

export const ImageGalleryItem = ({ webformatURL, largeImageURL, tags, onOpenModal }) => (
  
        <li className={css.ImageGalleryItem}>
            <img
            className={css.ImageGalleryItemImage}
            src={webformatURL}
            data-source={largeImageURL}
            alt={tags}
            onClick={onOpenModal}
            />
        </li>
    );


ImageGalleryItem.propTypes = {
    webformatURL: propTypes.string.isRequired,
    largeImageURL: propTypes.string.isRequired,
    tags: propTypes.string.isRequired,
    onOpenModal: propTypes.func,
}
