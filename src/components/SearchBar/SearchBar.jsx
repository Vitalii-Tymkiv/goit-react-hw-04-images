import { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input, SearchHeader } from './SearchBar.styled';
import { GoSearch } from 'react-icons/go';
import toast, { Toaster } from 'react-hot-toast';

const INITIAL_STATE = {
  query: '',
};

export class SearchBar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };
  state = INITIAL_STATE;

  handleSearch = ({ target }) => {
    this.setState({ query: target.value });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const { query } = this.state;
    const { onSubmit } = this.props;
    if (query.trim() === '') {
      toast.error('Enter a search query', {
        duration: 2000,
        style: {
          border: '1px solid #3f51b5',
          padding: '16px',
          color: '#3f51b5',
          width: '400px',
        },
      });
      return;
    }
    onSubmit(query);

    this.resetSearchForm();
  };

  resetSearchForm = () => {
    this.setState(INITIAL_STATE);
  };

  render() {
    const { query } = this.state;
    return (
      <SearchHeader>
        <Form onSubmit={this.handleFormSubmit}>
          <Button type="submit" aria-label="search">
            <GoSearch></GoSearch>
          </Button>

          <Input
            name="search"
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleSearch}
            value={query}
          ></Input>
        </Form>
        <Toaster position="top-center" />
      </SearchHeader>
    );
  }
}
