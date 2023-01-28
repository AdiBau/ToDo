function isValidate(input) {
  const regex = /<|>|#|\$/g

  const valid = input.match(regex)
  return valid === null ? true : false
}
