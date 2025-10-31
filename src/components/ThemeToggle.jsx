import React, { memo, useState, useEffect } from 'react'
import { MoonIcon, SunIcon } from './Icons'
import '../styles/ThemeToggle.css'

const ThemeToggle = memo(() => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    return savedTheme || 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label="Toggle theme"
      title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {theme === 'light' ? (
        <MoonIcon size={22} color="var(--text-primary)" />
      ) : (
        <SunIcon size={22} color="var(--text-primary)" />
      )}
    </button>
  )
})

ThemeToggle.displayName = 'ThemeToggle'

export default ThemeToggle

