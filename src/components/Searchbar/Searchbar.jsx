import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Header, Form, Button, Input } from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChangeInput = event => {
    setQuery(event.currentTarget.value);
  };

  const onSubmitForm = event => {
    event.preventDefault();
    if (query.trim() === '') {
      setQuery('');
      return;
    }
    onSubmit(query.trim());
    setQuery('');
  };

  return (
    <Header>
      <Form onSubmit={onSubmitForm}>
        <Button type="submit">
          <span>Search</span>
        </Button>

        <Input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleChangeInput}
        />
      </Form>
    </Header>
  );
};

export default Searchbar;

// перевірка propTypes
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
