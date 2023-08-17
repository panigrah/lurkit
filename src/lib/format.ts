export const count = (n: number) => {
  if( n < 1000 ) {
    return n
  }

  if( n < 1000000) {
    return Math.trunc(n/100)/10 + 'K'
  }

  return Math.trunc(n/100000)/10 + 'M'
}