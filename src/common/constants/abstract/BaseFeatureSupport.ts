export default class BaseFeatureSupport<V = any, T = any> {
  static getEnumMap<V = any, T = any>() {
    const prototypeMap = Object.getOwnPropertyDescriptors(this)
    const enumMap = {} as Record<string, BaseFeatureSupport<V, T>>
    for (const prototypeName in prototypeMap) {
      const val = prototypeMap[prototypeName].value
      if (val instanceof BaseFeatureSupport && val._name) {
        enumMap[val._name] = val
      }
    }
    return enumMap
  }

  static getEnumList<V = any>() {
    const prototypeMap = Object.getOwnPropertyDescriptors(this)
    const enumList = []
    for (const prototypeName in prototypeMap) {
      const val = prototypeMap[prototypeName].value
      if (val instanceof BaseFeatureSupport && val._name) {
        enumList.push(val)
      }
    }
    return enumList as BaseFeatureSupport<V>[]
  }

  static getValueByName<V>(name: string) {
    const enumMap = this.getEnumMap<V>()
    const _enum = enumMap[name]
    return _enum ? _enum.value() : null
  }

  static getNameByValue(value: unknown) {
    const enumList = this.getEnumList()
    let name = ''
    enumList.forEach(_enum => {
      if (_enum.value() === value) {
        name = _enum.name()
      }
    })
    return name
  }

  static getMetaByName<T>(name: string) {
    const enumList = this.getEnumList()
    let meta: T | undefined
    enumList.forEach(_enum => {
      if (_enum.name() === name) {
        meta = _enum.meta()
      }
    })
    return meta
  }

  _name: string
  _value: string[]
  _meta?: T

  constructor(name: string, value: string[], meta?: T) {
    this._name = name
    this._value = value
    this._meta = meta
  }

  name() {
    return this._name
  }

  value() {
    return this._value
  }

  meta() {
    return this._meta
  }

  support(chain?: string) {
    return chain && this.value().includes(chain)
  }
}
