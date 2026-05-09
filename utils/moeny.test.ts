import { describe, expect, it } from '@jest/globals'

import {
  firstSplitMoneyMinor,
  formatMoneyMinor,
  parseDisplayMoneyToMinor,
  splitMoneyMinor,
} from './moeny'

describe('money helpers', () => {
  it('parses and formats exact cent values', () => {
    expect(parseDisplayMoneyToMinor('12.34')).toBe('1234')
    expect(parseDisplayMoneyToMinor('0.01')).toBe('1')
    expect(formatMoneyMinor('-500')).toBe('-5.0')
  })

  it('rejects sub-cent display values', () => {
    expect(() => parseDisplayMoneyToMinor('0.0001')).toThrow()
  })

  it('splits uneven amounts in whole cents', () => {
    expect(splitMoneyMinor('100', 3)).toEqual(['34', '33', '33'])
    expect(firstSplitMoneyMinor('100', 3)).toBe('34')
  })
})
