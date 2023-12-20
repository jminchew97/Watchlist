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
    <Form onSubmit={handleSearch} inline>
      <FormControl type="text" placeholder="Search" autoComplete="off" className="mr-sm-2" name="searchTerm" />
      <Button type="submit" variant="outline-success">Search</Button>
    </Form>
  );
};

export default SearchBar;
