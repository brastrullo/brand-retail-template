import { useState, useEffect } from 'react';

const useDropdown = () => {
  const [isDropdownShown, setIsDropdownShown] = useState(false);

  useEffect(() => {
    console.log({isDropdownShown})
  }, [isDropdownShown])

  const dropdownHandler = () => {
    setIsDropdownShown(!isDropdownShown)
  }

  return {
    isDropdownShown,
    dropdownHandler
  }
}

export default useDropdown;