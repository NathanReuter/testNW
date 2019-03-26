import 'es6-promise/auto'
import Validator from '../../../src/validators'

describe('Validator.js', () => {
  it('should validate the correct CPF', () => {
    const testCPF = '45092461020'
    expect(Validator.validateCPF(testCPF)).to.be.equal(true)
  })

  it('should invalidate the incorrect CPF', () => {
    const testCPF = '08848557955'
    expect(Validator.validateCPF(testCPF)).to.be.equal(false)
  })

  it('should validate the correct CNPJ', () => {
    const testCNPJ = '66669527000111'
    expect(Validator.validateCNPJ(testCNPJ)).to.be.equal(true)
  })

  it('should invalidate the incorrect CPF', () => {
    const testCNPJ = '666695270009877'
    expect(Validator.validateCNPJ(testCNPJ)).to.be.equal(false)
  })
})
