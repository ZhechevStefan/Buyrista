import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import styles from "./SearchInput.module.css";

const SearchInputAutocomplete = props => {
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionIndex, setSuggestionIndex] = useState(null);
  const [suggestionsActive, setSuggestionsActive] = useState(false);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const data = [
    "iphone",
    "playstation",
    "sony playstation",
    "playstation 5",
    "playstation 4",
    "mouse",
    "gaming",
    "camera"
  ];

  const handleChange = e => {
    const query = e.target.value.toLowerCase();
    setKeyword(query);
    if (query.length > 1) {
      const filterSuggestions = data.filter(
        suggestion => suggestion.toLowerCase().indexOf(query) > -1
      );
      if (filterSuggestions.length > 0) {
        setSuggestions(filterSuggestions);
        setSuggestionsActive(true);
      } else {
        setSuggestionsActive(false);
      }
    } else {
      setSuggestionsActive(false);
      setSuggestionIndex(null);
    }
  };

  const handleClick = e => {
    setSuggestions([]);
    setKeyword(e.target.innerText);
    setSuggestionsActive(false);
    setSuggestionIndex(null);
    navigate(`/search/?keyword=${keyword}`);
  };

  const handleKeyDown = e => {
    // UP ARROW
    if (e.keyCode === 38) {
      console.log(suggestionIndex);
      e.preventDefault();
      if (!suggestionsActive) {
        return;
      }

      if (suggestionIndex === 0 || suggestionIndex === null) {
        console.log(suggestions.length - 1);
        setSuggestionIndex(suggestions.length - 1);
        return;
      }

      setSuggestionIndex(suggestionIndex - 1);
    }
    // DOWN ARROW
    else if (e.keyCode === 40) {
      console.log(suggestionIndex);
      if (!suggestionsActive) {
        return;
      }

      if (
        suggestionIndex + 1 === suggestions.length ||
        suggestionIndex === null
      ) {
        setSuggestionIndex(0);
        return;
      }
      setSuggestionIndex(suggestionIndex + 1);
      //ESC
    } else if (e.keyCode === 27) {
      e.preventDefault();
      setSuggestionsActive(false);
      setSuggestionIndex(null);
    }
    // ENTER
    else if (e.keyCode === 13) {
      if (suggestionsActive) {
        setKeyword(suggestions[suggestionIndex]);
        setSuggestionIndex(null);
        setSuggestionsActive(false);
        navigate(`/search/?keyword=${keyword}`);
      } else {
        navigate(`/search/?keyword=${keyword}`);
      }
    }
  };

  const sendSearchQuery = () => {
    navigate(`/search/?keyword=${keyword}`);
  };

  const Suggestions = () => {
    return (
      <ul className={styles.suggestions}>
        <div>Popular Suggestions</div>
        {suggestions.map((suggestion, index) => {
          return (
            <li
              className={`${index === suggestionIndex && styles.active}`}
              // className={index === suggestionIndex ? "active" : ""}
              key={index}
              onClick={handleClick}
            >
              {suggestion}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className={styles.searchbox}>
      <Link>
        <svg aria-hidden="true" viewBox="0 0 24 24" onClick={sendSearchQuery}>
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
        </svg>
      </Link>
      <input
        className={`${styles.input} ${
          suggestionsActive && styles["open-suggestions"]
        }`}
        aria-label="Search for a product"
        type="search"
        placeholder="What are you searchng for?"
        value={keyword}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {suggestionsActive && <Suggestions />}
    </div>
  );
};

export default SearchInputAutocomplete;
