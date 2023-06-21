import React, { useState, useEffect, useRef } from 'react';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const searchInputRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setSearchQuery(value);

    // Perform API call or any other logic to fetch suggestions based on the search query
    // For simplicity, I'll use a predefined array of suggestions here
    const mockSuggestions = ['Chicken tikka', 'Boneless Chicken', 'leg Piece', 'Desi Chicken','Fried Chicken','American Chicken'];
    const filteredSuggestions = mockSuggestions.filter((suggestion) =>
      suggestion.toLowerCase().startsWith(value.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Perform search or any other action based on the search query
    console.log('Perform search for:', searchQuery);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setSuggestions([]);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="search-container" ref={searchInputRef}>
        <input
          type="text"
          placeholder="Search.."
          name="search"
          value={searchQuery}
          onChange={handleInputChange}
          style={{ color: 'white' }}
        />
        <button type="submit">
          <i className="fa fa-search"></i>
        </button>
      </div>

      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              style={{ color: 'white' }}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};

export default SearchBar;
