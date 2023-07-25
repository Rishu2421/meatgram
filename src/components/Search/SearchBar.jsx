import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Search.css'

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const searchInputRef = useRef();
  const [itemsName,setItemsName]=useState([]);
  const [itemsData,setItemsData]=useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const inputField = document.querySelector('input[type="text"]');
    if (inputField) {
      inputField.addEventListener('click', toggleSuggestions);
    }
    fetchItemsName(); 
    return () => {
      inputField.removeEventListener('click', toggleSuggestions);
    };
  }, []);


  useEffect(() => {
    const handleFormSubmission = async () => {
      if (searchQuery !== '') {
        const nameToSearch = searchQuery;
        const foundObject = itemsData.find((data) => data.name === nameToSearch);

        if (foundObject) {
          const productId = foundObject._id;
          console.log('Perform search for ID:', productId);

          navigate(`products?ids=${productId}`);
          // For example, pass it to other functions or make an API call with the ID
        } else {
          console.log('Name not found in the array.');
        }
      }
    };

    handleFormSubmission();
  }, [itemsData, navigate, searchQuery]);
  const fetchItemsName = async () => {
    try {
      const response = await fetch('/api/products/itemsName');
    
      const data = await response.json();
      setItemsData(data);
      const items = data.map((product) => product.name);
      setItemsName(items);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  const handleInputChange = (e) => {
    const { value } = e.target;
    setSearchQuery(value);
    // Perform API call or any other logic to fetch suggestions based on the search query
    // For simplicity, I'll use a predefined array of suggestions here
    
    const filteredSuggestions = itemsName.filter((suggestion) =>
      suggestion.toLowerCase().startsWith(value.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  
    const nameToSearch = searchQuery;
    const foundObject = itemsData.find((data) => data.name === nameToSearch);
  
    if (foundObject) {
      const productId = foundObject._id;
      console.log('Perform search for ID:', productId);
      
      navigate(`products?ids=${productId}`);
      // For example, pass it to other functions or make an API call with the ID
    } else {
      console.log('Name not found in the array.');
    }
  };
  

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setSuggestions([]);
  };
  const toggleSuggestions = () => {
    const suggestionsDropdown = document.querySelector('.suggestions');
    if (suggestionsDropdown) {
      suggestionsDropdown.style.display =
        suggestions.length > 0 ? 'block' : 'none';
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="search-container dropdown" ref={searchInputRef}>
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
        <ul className="suggestions dropdown-menu">
          {suggestions.map((suggestion, index) => (
            <li
              className="dropdown-item"
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
