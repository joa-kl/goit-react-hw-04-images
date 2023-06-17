import css from './../Styles.module.css'
import propTypes from 'prop-types';
import { useState } from 'react';
import { FaSistrix } from "react-icons/fa";

export const SearchBar = ({ onHandleSubmit}) => {
    const [query, setQuery] = useState("");

    const onSubmit = evt => {
        evt.preventDefault();
        if (query.trim() === 0) {
            return alert("Please use search field");
        }
        onHandleSubmit(query);
        setQuery("");
    };

    return (
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
                    value={query}
                    onChange={({target})=> setQuery(target.value)}
                />
            </form>
        </header >
        )
}

SearchBar.propTypes = {
    onHandleSubmit: propTypes.func.isRequired,
}