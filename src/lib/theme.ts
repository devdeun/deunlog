export const isDarkMode = () => {
  if (typeof window === 'undefined') return false

  const savedTheme = localStorage.getItem('theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

  return savedTheme === 'dark' || (!savedTheme && prefersDark)
}
