import { getScriptUrl } from '@common/utils/brower'

export const insertScript = (scriptName: string) => {
  const script = document.createElement('script')
  script.src = getScriptUrl(`${scriptName}`)

  script.onload = function () {
    script.remove()
  }
  document.head.appendChild(script)
}

export const clearInterceptData = () => {
  document.querySelector<HTMLElement>('#__interceptedData')?.remove()
}
