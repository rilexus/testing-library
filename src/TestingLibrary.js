

class TestingLibrary {
  constructor() {
    this.describe = this.describe.bind(this);
    this.test = this.test.bind(this);
    this.expect = this.expect.bind(this);
  }
  called = false;
  args = [];

  mock = {
    __self: this,
    fu: function () {
      this.__self.args = [];
      this.__self.called = false;
      return (...args) => {
        this.__self.args = [...args];
        this.__self.called = true;
      }
    }
  }

  expect(val) {
    return {
      __self: this,
      toBe: function (value) {
        if (value !== val) throw new Error(`Got ${val} expected ${value}`);
        return true
      },

      toBeNull: function (value) {
        if (value !== null) throw new Error(`Got ${val} expected ${value}`);
        return true;
      },

      toHaveBeenCalled: function () {
        if (!this.__self.called) throw new Error(`Mocked function was not called!`);
        return true
      },

      toHaveBeenCalledWithArguments: function (...args) {
        if (!this.__self.args.every((arg) => args.includes(arg))) throw new Error(`Got: ${args} but expected ${this.__self.args}!`);
        return true
      },

      not: {
        toBe: function (value) {
          if (value === val) throw new Error(`Got ${val} expected ${value}`);
          return true
        },
      }
    }
  }

  describe(description, callback) {
    console.log(`TEST: ${description}: `)
    callback()
  }

  test(description, callback) {
    try {
      const res = callback() // true or throws Error
      console.log(`\t ✅ ${description}!`)
    } catch (e) {
      console.log(`\t ❌ ${description} failed!`);
      console.log('\t\t',e)
    }

  }
}

const library = new TestingLibrary();

module.exports = {
  library,
  describe: library.describe,
  test: library.test,
  expect: library.expect,
};