import React, { useState, useEffect } from 'react'
import AlertBanner from 'components/AlertBanner'
import Navbar from './Navbar'
import '/globals.css'

export default function BlogLayout({
  preview,
  loading,
  children,
}: {
  preview: boolean
  loading?: boolean
  children: React.ReactNode
}) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'white'
    setIsDarkMode(savedTheme === 'black')

    // Apply the theme class to the document element
    if (savedTheme === 'black') {
      document.documentElement.classList.add('dark') // Enable dark mode globally
    } else {
      document.documentElement.classList.remove('dark') // Disable dark mode globally
    }
  }, [])

  // Toggle function to switch themes
  const toggleTheme = () => {
    const newTheme = !isDarkMode
    setIsDarkMode(newTheme)

    // Apply or remove the 'dark' class globally
    if (newTheme) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'black')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'white')
    }
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#1a1a1a] text-white' : 'bg-white text-[#1a1a1a]'}`}>
      <AlertBanner preview={preview} loading={loading} />
      <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      <main>{children}</main>
    </div>
  )
}
