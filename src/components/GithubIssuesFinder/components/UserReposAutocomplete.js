import React from 'react';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function UserReposAutocomplete({
  disabled,
  options,
  onChange,
  value,
}) {
  return (
    <Autocomplete
      id="user-repos"
      className="github-autocomplete"
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      disabled={disabled}
      onChange={(_, value) => {
        onChange(value);
      }}
      value={value}
      options={options}
      renderInput={(params) => (
        <TextField {...params} label="User repos" variant="outlined" />
      )}
    />
  );
}
