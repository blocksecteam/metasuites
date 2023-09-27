import type { FieldNames, BaseOptionType } from 'rc-select/lib/Select'
import type { ColumnFilterItem } from 'antd/es/table/interface'

export default class BaseConstant<V = any> {
  static getEnumMap<V = any>() {
    const prototypeMap = Object.getOwnPropertyDescriptors(this)
    const enumMap = {} as Record<string, BaseConstant<V>>
    for (const prototypeName in prototypeMap) {
      const val = prototypeMap[prototypeName].value
      if (val instanceof BaseConstant && val._name) {
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
      if (val instanceof BaseConstant && val._name) {
        enumList.push(val)
      }
    }
    return enumList as BaseConstant<V>[]
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

  static getDescByValue(value: unknown) {
    const enumList = this.getEnumList()
    let desc = ''
    enumList.forEach(_enum => {
      if (_enum.value() === value) {
        desc = _enum.desc()
      }
    })
    return desc
  }

  static getSelectOptionsByDescAndValue<V>(fieldNames?: FieldNames) {
    const enumList = this.getEnumList<V>()
    const options: BaseOptionType = []
    enumList.forEach(_enum => {
      options.push({
        [fieldNames?.value ?? 'value']: _enum.value(),
        [fieldNames?.label ?? 'label']: _enum.desc()
      })
    })
    return options
  }

  static getSelectOptionsByNameAndValue<V>(fieldNames?: FieldNames) {
    const enumList = this.getEnumList<V>()
    const options: BaseOptionType[] = []
    enumList.forEach(_enum => {
      options.push({
        [fieldNames?.value ?? 'value']: _enum.value(),
        [fieldNames?.label ?? 'label']: _enum.name()
      })
    })
    return options
  }

  static getColumnFilterItemsByNameAndValue() {
    const enumList = this.getEnumList()
    const options: ColumnFilterItem[] = []
    enumList.forEach(_enum => {
      options.push({
        value: _enum.value(),
        text: _enum.name()
      })
    })
    return options
  }

  _name: string
  _value: V
  _desc: string

  constructor(name: string, value: V, desc = '') {
    this._name = name
    this._value = value
    this._desc = desc
  }

  name() {
    return this._name
  }

  value() {
    return this._value
  }

  desc() {
    return this._desc
  }
}
