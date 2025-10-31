import React, { memo } from 'react'
import '../styles/FilterButtons.css'

const FilterButtons = memo(({ filter, onFilterChange }) => {
  const filters = [
    { key: 'all', label: 'All' },
    { key: 'pending', label: 'Pending' },
    { key: 'completed', label: 'Completed' },
  ]

  return (
    <div className="filter-buttons">
      {filters.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onFilterChange(key)}
          className={`filter-button ${filter === key ? 'active' : ''}`}
          aria-label={`Filter ${label} tasks`}
        >
          {label}
        </button>
      ))}
    </div>
  )
})

FilterButtons.displayName = 'FilterButtons'

export default FilterButtons

