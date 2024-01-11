let BASE_URL: string, SLEUTH_DOMAIN: string, PHALCON_EXPLORER_DOMAIN: string
switch (import.meta.env.MODE) {
  case 'production':
    BASE_URL = 'https://extension.blocksec.com'
    SLEUTH_DOMAIN = 'https://metasleuth.io'
    PHALCON_EXPLORER_DOMAIN = 'https://phalcon.blocksec.com/explorer'
    break
  default:
    BASE_URL = 'https://extension-dev.blocksec.com'
    SLEUTH_DOMAIN = 'https://www-dev.metasleuth.io'
    PHALCON_EXPLORER_DOMAIN = 'https://phalcon-dev.blocksec.com/explorer'
}

export { BASE_URL, SLEUTH_DOMAIN, PHALCON_EXPLORER_DOMAIN }
