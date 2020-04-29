import React, { useState, useEffect } from 'react';
import { Checkbox } from 'antd';

const FilterInput = ({sendFilters}) => {
  const [filters, setFilters] = useState({
    lenovo: true,
    hp: false,
    dell: false
  })

  useEffect(() => {
    
    const selectedFilters = () => {
      let result = [];
      Object.keys(filters).forEach(function(key) {
        if (filters[key] === true) {
          result.push(key)
        }
      });

      return result;
    }
    
    sendFilters(selectedFilters());
  }, [filters])

  const handleChange = (e) => {
    const newState = {
      [e.target.name]: !filters[e.target.name]
    }
    setFilters({
      ...filters,
      ...newState
    })
  }

  return (
    <div className='filters'>
      <div className='filters__laptop'>
        <Checkbox onChange={handleChange} checked={filters.lenovo} name='lenovo'>Lenovo</Checkbox>
        <Checkbox onChange={handleChange} name='hp'>HP</Checkbox>
        <Checkbox onChange={handleChange} name='dell'>Dell</Checkbox>
      </div>
    </div>
  )
}

export default FilterInput;