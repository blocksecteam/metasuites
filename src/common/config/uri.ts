let BASE_URL: string, SLEUTH_DOMAIN: string
switch (import.meta.env.MODE) {
  case 'production':
    BASE_URL = 'https://extension.blocksec.com/'
    SLEUTH_DOMAIN = 'https://metasleuth.io'
    break
  default:
    BASE_URL = 'https://extension-dev.blocksec.com/'
    SLEUTH_DOMAIN = 'https://www-dev.metasleuth.io'
}

export { BASE_URL, SLEUTH_DOMAIN }
