export default class Test {
  state = {
    active: false
  };

  test () {
    this.spread(1, 2, { c: 3, d: 4 }, 5)
  }

  spread (a, b, { c, d }, ...args) {
    this.print(a, b, c, d, ...args)
  }

  print (...args) {
    console.log(...args)
  }
}
