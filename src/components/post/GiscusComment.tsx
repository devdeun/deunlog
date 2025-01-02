import { useEffect } from 'react'

const giscusThemes = {
  light: 'https://giscus.app/themes/light.css',
  dark: 'https://giscus.app/themes/dark_dimmed.css',
} as const

export const changeGiscusTheme = (theme: keyof typeof giscusThemes) => {
  const sendMessage = (config: unknown) => {
    const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame')
    iframe?.contentWindow?.postMessage({ giscus: config }, 'https://giscus.app')
  }

  sendMessage({
    setConfig: {
      theme: giscusThemes[theme],
    },
  })
}

export const GiscusComment = (props: React.HTMLAttributes<HTMLElement>) => {
  useEffect(() => {
    const theme: keyof typeof giscusThemes = document.documentElement.classList.contains('dark')
      ? 'dark'
      : 'light'

    const giscusAttributes = {
      src: 'https://giscus.app/client.js',
      'data-repo': 'devdeun/deunlog',
      'data-repo-id': 'R_kgDONgmIDw',
      'data-category': 'Comments',
      'data-category-id': 'DIC_kwDONgmID84Clq9d',
      'data-mapping': 'title',
      'data-strict': '1',
      'data-reactions-enabled': '1',
      'data-emit-metadata': '0',
      'data-input-position': 'bottom',
      'data-lang': 'ko',
      'data-theme': giscusThemes[theme],
      crossorigin: 'anonymous',
      async: '',
    }

    const giscusScript = document.createElement('script')
    Object.entries(giscusAttributes).forEach(([key, value]) =>
      giscusScript.setAttribute(key, value)
    )
    document.querySelector('#giscus')?.appendChild(giscusScript)
  }, [])

  return <section {...props} style={{ minHeight: '372px' }} id="giscus"></section>
}
