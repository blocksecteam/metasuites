import { createInitializer } from './factory'

const currentUrl = window.location.href
const initializer = createInitializer(currentUrl, true)
initializer?.init()
