module.exports = function (text, search, replacement) {
  return text.split(search).join(replacement)
}
