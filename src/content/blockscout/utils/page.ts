export const waitUntilDataLoaded = (
  deps: Array<JQuery<HTMLElement>>
): Promise<boolean> => {
  return new Promise(resolve => {
    const intervalId = window.setInterval(() => {
      const isAllDepsLoaded = deps.every(dep => dep.data('ready') === 'true')
      if (isAllDepsLoaded) {
        window.clearInterval(intervalId)
        resolve(true)
      }
    }, 2_000)

    window.setTimeout(() => {
      window.clearInterval(intervalId)
      resolve(false)
    }, 20_000)
  })
}
