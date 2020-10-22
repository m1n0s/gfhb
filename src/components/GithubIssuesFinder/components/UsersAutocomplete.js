import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function UsersAutocomplete({
  loading,
  options,
  onChange,
  onSearch,
}) {
  return (
    <Autocomplete
      id="github-users"
      className="github-autocomplete"
      onInputChange={(_, nextValue) => {
        onSearch(nextValue);
      }}
      getOptionSelected={(option, value) => option.login === value.login}
      getOptionLabel={(option) => option.login}
      onChange={(_, value) => {
        onChange(value);
      }}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Github user"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
