import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from '../Styles.module.css';
import propTypes from 'prop-types';

export const ImageGallery = ({ onOpenModal, images }) => (
    <ul className={css.ImageGallery}>
        {images.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                tags={tags}
                onOpenModal={onOpenModal} />
        ))}
    </ul>
);

ImageGallery.propTypes = {
    images: propTypes.array.isRequired,
    onOpenModal: propTypes.func.isRequired,
};