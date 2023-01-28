const notFound = (req, res) => {
  res.status(404).send('<H1 style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);">URL NOT EXIST</H1>')
}

module.exports = notFound
