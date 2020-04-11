const {expect, test, describe, library} = require('./src/index');

describe('First Test: ', () => {

  test('should be equal', () => {
    expect(1).toBe(1);
  })

  test('should not be equal', () => {
    expect(1).not.toBe(2);
  })

  test('should call a function', () => {
    const mockedFunction = library.mock.fu()
    mockedFunction()
    expect(mockedFunction).toHaveBeenCalled()
  })

  test('should call a function with args', () => {
    const mockedFunction = library.mock.fu()
    mockedFunction(1,2);
    expect(mockedFunction).toHaveBeenCalledWithArguments(1,2)
  })

});


