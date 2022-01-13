export const handleErrors = (err, req, res, next) => {
  if (err.name === 'UnauthorizedError') return res.status(401).json({ message: 'invalid token...' })
  if (err.name === 'CastError') return res.status(400).json({ message: 'invalid id...' })
  return res.status(500).json({ message: 'something went wrong...' })
}
