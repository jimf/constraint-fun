function Pair (left, right) {
  const o = Object.create(Pair.prototype)
  o.left = left
  o.right = right
  return o
}

module.exports = Pair
