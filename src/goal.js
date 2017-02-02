exports.equal = function equal (a, b) {
  return function (state) {
    return [state.unify(a, b)]
  }
}

exports.bind = function bind (names, f) {
  return function (state) {
    const [newState, vars] = state.createVars(names)
    return f(...vars)(newState)
  }
}

exports.either = function either (a, b) {
  return function (state) {
    return a(state).concat(b(state))
  }
}

exports.both = function both (a, b) {
  return function (state) {
    return a(state).reduce(function (states, newState) {
      return states.concat(b(newState))
    }, [])
  }
}
