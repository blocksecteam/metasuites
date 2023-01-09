export const BASE_URL = `https://extension${
  import.meta.env.MODE === 'production' ? '' : '-dev'
}.blocksec.com/`
