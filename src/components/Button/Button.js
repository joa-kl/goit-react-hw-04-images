import css from '../Styles.module.css';
import propTypes from 'prop-types';

export const Button = ({ onLoadMore }) => (
    <button
        className={css.Button}
        onClick={onLoadMore}
        type="button">
        Load more
    </button>
);

Button.propTypes = {
    onLoadMore: propTypes.func,
}