import React, { useState } from "react";
import useDebounce from "../../Hooks/useDebounce";

import './style.css';

export default function SearchInput({value, placeholder, onChange}) {
  const [displayValue, setDisplayValue] = useState(value)
  const debouncedChange = useDebounce(onChange, 1000);

  function handleChange(event) {
    setDisplayValue(event.target.value);
    debouncedChange(event.target.value);
  }

  return (
    <>
      <input title="searchInput"
      placeholder={placeholder}
      type="search"
      value={displayValue}
      onChange={handleChange} />
    </>
    
  )
}
