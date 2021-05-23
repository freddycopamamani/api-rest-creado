import React from 'react';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select as MuiSelect } from '@material-ui/core';

const Select = (props) => {

  const { variant, name, label, value, error=null, onChange, options} = props;
  return (
    <FormControl fullWidth size="small" variant={variant || "outlined"}
    {...(error && {error:true})}>
      <InputLabel >{label}</InputLabel>
      <MuiSelect
        labelWidth={100}
        size=""
        
        name={name}
        value={value}
        onChange={onChange}
      >
        
        {
          options.map(
                item => (<MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>) 
          )
        }
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default Select;
