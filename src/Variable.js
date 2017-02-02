function Variable (name) {
  const o = Object.create(Variable.prototype)
  o.name = name
  return o
}

Variable.named = function named (names) {
  return names.map(Variable)
}

module.exports = Variable
