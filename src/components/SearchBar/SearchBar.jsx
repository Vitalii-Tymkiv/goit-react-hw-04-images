import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input, SearchHeader } from './SearchBar.styled';
import { GoSearch } from 'react-icons/go';
import toast, { Toaster } from 'react-hot-toast';

export const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSearch = ({ target }) => {
    setQuery(target.value);
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    console.log(event.target.elements.search.value);

    if (query.trim() === '') {
      return toast.error('Enter a search query', {
        duration: 2000,
        style: {
          border: '1px solid #3f51b5',
          padding: '16px',
          color: '#3f51b5',
          width: '400px',
        },
      });
    }

    onSubmit(query);
    setQuery('');
  };

  return (
    <SearchHeader>
      <Form onSubmit={handleFormSubmit}>
        <Button type="submit" aria-label="search">
          <GoSearch></GoSearch>
        </Button>

        <Input
          name="search"
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleSearch}
          value={query}
        ></Input>
      </Form>
      <Toaster position="top-left" />
    </SearchHeader>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
