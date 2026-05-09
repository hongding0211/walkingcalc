import { describe, expect, it } from '@jest/globals'

import { resolveDebt } from './debt'

describe('resolveDebt', () => {
  it('resolves exact minor-unit balances', () => {
    expect(
      resolveDebt([
        { uuid: 'u1', debtMinor: '-120', debt: '-120' },
        { uuid: 'u2', debtMinor: '80', debt: '80' },
        { uuid: 'tmp1', debtMinor: '40', debt: '40' },
      ])
    ).toEqual([
      expect.objectContaining({
        amountMinor: '80',
        from: expect.objectContaining({ uuid: 'u1' }),
        to: expect.objectContaining({ uuid: 'u2' }),
      }),
      expect.objectContaining({
        amountMinor: '40',
        from: expect.objectContaining({ uuid: 'u1' }),
        to: expect.objectContaining({ uuid: 'tmp1' }),
      }),
    ])
  })

  it('returns no transfers when all balances are settled', () => {
    expect(
      resolveDebt([
        { uuid: 'u1', debtMinor: '0', debt: '0' },
        { uuid: 'u2', debtMinor: '0', debt: '0' },
      ])
    ).toEqual([])
  })
})
