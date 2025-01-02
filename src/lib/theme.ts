export const isDarkMode = () => {
  const savedTheme = localStorage.getItem('theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

  return savedTheme === 'dark' || (!savedTheme && prefersDark)
}
