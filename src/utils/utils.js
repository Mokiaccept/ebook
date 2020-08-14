export function px2rem (px) {
  const ratio = 375 / 10
  return px / ratio
}
export function realPx (px) {
  const maxWidth = window.innerWidth > 500 ? 500 : window.innerWidth
  return px * (maxWidth / 375)
}

export function addCss (href) {
  const link = document.createElement('link')
  link.setAttribute('rel', 'stylesheet')
  link.setAttribute('type', 'text/css')
  link.setAttribute('href', href)
  document.querySelector('head').appendChild(link)
}

export function removeCss (href) {
  const links = document.querySelectorAll('link')
  for (let i = 0; i < links.length; i++) {
    if (links[i].href === href) {
      document.querySelector('head').removeChild(links[i])
    }
  }
}

export function clearCss () {
  const links = document.querySelectorAll('link')
  for (let i = 0; i < links.length; i++) {
    if (links[i].href && links[i].href.indexOf('theme') > -1) {
      document.querySelector('head').removeChild(links[i])
    }
  }
}
