;(() => {
  try {
    let background = localStorage.getItem('hermes-boot-background')
    let scheme = localStorage.getItem('hermes-boot-color-scheme')

    if (!background) {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      background = systemDark ? '#080d12' : '#f4f7f9'
      scheme = systemDark ? 'dark' : 'light'
    }

    document.documentElement.style.backgroundColor = background
    if (scheme === 'dark' || scheme === 'light') {
      document.documentElement.style.colorScheme = scheme
    }
  } catch {
    // Storage or matchMedia unavailable — keep UA defaults.
  }
})()
