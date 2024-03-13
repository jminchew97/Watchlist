import React from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';

const SearchBar = ({ onSearch }) => {
  const handleSearch = (event) => {
    // Prevent the form from submitting and refreshing the page
    event.preventDefault();

    // Access the input value and pass it to the onSearch callback
    const searchTerm = event.target.elements.searchTerm.value;
    onSearch(searchTerm);
  };

  return (
    <Form onSubmit={handleSearch}className='search-movie-component'>
      <h1>Search for a movie title</h1>
      <FormControl type="text" placeholder="movie name" autoComplete="off" className="mb-4 bg-dark text-light border-light" name="searchTerm" />
      <button type="submit" variant="outline-success">Search </button>
    </Form>
  );
};

export default SearchBar;
