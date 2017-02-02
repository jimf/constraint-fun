const Variable = require('./Variable')
const Pair = require('./Pair')

function State (vars = [], values = {}) {
  const o = Object.create(State.prototype)
  o.vars = vars
  o.values = values
  return o
}

State.prototype.createVars = function createVars (names) {
  const newVars = Variable.named(names)
  return [State(newVars, this.values), newVars]
}

State.prototype.assign = function assign (variable, value) {
  return State(this.vars, Object.assign({}, this.values, {
    [variable.name]: value
  }))
}

State.prototype.walk = function walk (term) {
  if (term instanceof Variable && term.name in this.values) {
    return this.walk(this.values[term.name])
  } else if (term instanceof Pair) {
    return Pair(this.walk(term.left), this.walk(term.right))
  }
  return term
}

State.prototype.unify = function unify (a, b) {
  const x = this.walk(a)
  const y = this.walk(b)

  if (x === y) {
    return this
  } else if (x instanceof Variable) {
    return this.assign(x, y)
  } else if (y instanceof Variable) {
    return this.assign(y, x)
  } else if ((x instanceof Pair) && (y instanceof Pair)) {
    const state = this.unify(x.left, y.left)
    return state && state.unify(x.right, y.right)
  }
}

module.exports = State
