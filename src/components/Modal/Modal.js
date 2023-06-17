import css from '../Styles.module.css';
import { useEffect } from 'react';


const Modal = ({onToggleModal, largeImageURL, tags}) => {

    useEffect(() => {
        const handleKeyDown = evt => {
            if (evt.code === 'Escape') {
                onToggleModal();
            }
        };
        window.removeEventListener('keydown', handleKeyDown);

        return () => {
            window.addEventListener('keydown', handleKeyDown);
        };
    }, [onToggleModal]);


    const handleBackdropClick = evt => {
        if (evt.currentTarget === evt.target) {
            onToggleModal();
        }
    };


    return (
        <div className={css.Overlay} onClick={handleBackdropClick}>
            <div className={css.Modal}>
                <img src={largeImageURL} alt={tags} />
            </div>
        </div>
    );
    }

export default Modal;