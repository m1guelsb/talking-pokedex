import React, { useState } from "react";
import useDebounce from "../../Hooks/useDebounce";

import './style.css';

export const SearchInput = ({value, placeholder, onChange}) => {
  const [displayValue, setDisplayValue] = useState(value)
  const debouncedChange = useDebounce(onChange, 1000);

  function handleChange(event) {
    setDisplayValue(event.target.value);
    debouncedChange(event.target.value);
  }

  return (
    <>
      <input
      placeholder={placeholder}
      type="search"
      value={displayValue}
      onChange={handleChange} />
    </>
    
  )
}
