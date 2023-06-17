import css from './../Styles.module.css'
import propTypes from 'prop-types';
import { FaSistrix } from "react-icons/fa";

export const SearchBar = ({ onSubmit, onSearchQueryChange, value }) => (
    < header className={css.Searchbar} >
        <form className={css.SearchForm} onSubmit={onSubmit}>
            <button type="submit" className={css.SearchFormButton}>
                <span ><FaSistrix /></span>
            </button>

            <input
                className={css.SearchFormInput}
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                name="query"
                value={value}
                onChange={onSearchQueryChange}
            />
        </form>
    </header >
)

SearchBar.propTypes = {
    onSubmit: propTypes.func.isRequired,
    onSearchQueryChange: propTypes.func.isRequired,
    value: propTypes.string.isRequired,
}