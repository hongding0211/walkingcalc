export function numberToString(n: number) {
  const negative = n < 0
  const intN = Math.floor(n) * (negative ? -1 : 1)
  const integerPart = Math.floor(intN / 100).toLocaleString()
  const decimalPart = intN % 100 === 0 ? '' : `.${intN % 100}`
  return (negative ? '-' : '') + integerPart + decimalPart
}

export function stringToNumber(str: string) {
  return Math.floor(+str * 100)
}
