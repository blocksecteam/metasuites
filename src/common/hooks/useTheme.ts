import { useEffect, useState } from 'react'

const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)

  useEffect(() => {
    const checkDarkMode = () => {
      const isLight =
        document.documentElement.classList.contains('light') || // solana
        document.documentElement
          .getAttribute('data-bs-theme') // etherscan v2
          ?.includes('light') ||
        !document.body.classList.length // etherscan v1
      setIsDarkMode(!isLight)
    }

    checkDarkMode()

    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function () {
        checkDarkMode()
      })
    })
    const observerConfig = {
      attributes: true,
      attributeFilter: ['class', 'data-bs-theme']
    }
    observer.observe(document.documentElement, observerConfig)
    observer.observe(document.body, observerConfig)

    return () => {
      observer.disconnect()
    }
  }, [])

  return { isDarkMode, mode: isDarkMode ? 'dark' : 'light' }
}

export default useTheme
