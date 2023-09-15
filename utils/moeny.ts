export function numberToString(n: number) {
  if (Math.abs(n) < 1e-10) {
    return '0'
  }
  const negative = n < 0
  const intN = Math.floor(n) * (negative ? -1 : 1)
  const integerPart = Math.floor(intN / 100).toLocaleString()
  const decimalPart = intN % 100 === 0 ? '.0' : `.${intN % 100}`
  return (negative ? '-' : '') + integerPart + decimalPart
}

export function stringToNumber(str: string) {
  return +str * 100
}
