import { palindromo } from './funcionesTest'

describe('palindromo', () => {
  test('test 1', () => {
    const result = palindromo('ana')
    expect(result).toBe('ana')
  })

  test('string vacio', () => {
    const result = palindromo('')
    expect(result).toBe('')
  })

// test('de undenfind', () => {
//   const result = palindromo()
//   expect(result).toBe('')
// })
})
