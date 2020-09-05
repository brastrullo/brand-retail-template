import { useState } from 'react';

const useDropdown = () => {
  const [isDropdownShown, setIsDropdownShown] = useState(false);

  const dropdownHandler = () => {
    setIsDropdownShown(!isDropdownShown)
  }

  return {
    isDropdownShown,
    dropdownHandler
  }
}

export default useDropdown;