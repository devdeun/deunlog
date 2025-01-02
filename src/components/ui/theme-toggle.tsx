import { useEffect, useState } from 'react'
import { MoonIcon, SunIcon } from './icons'
import { changeGiscusTheme } from '../post/GiscusComment'
import { Button } from './button'
import { isDarkMode } from '@/lib/theme'

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const isDark = isDarkMode()
    setIsDark(isDark)

    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark'
    setIsDark((prevTheme) => !prevTheme)
    document.documentElement.classList.toggle('dark')

    localStorage.setItem('theme', newTheme)
    changeGiscusTheme(newTheme)
  }

  return (
    <Button onClick={toggleTheme} variant="ghost" size="icon">
      <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">테마 변경</span>
    </Button>
  )
}

export default ThemeToggle
