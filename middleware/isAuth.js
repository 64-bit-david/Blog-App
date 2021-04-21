module.exports = (req, res, next) => {

  //req.user is created by passport if user has valid cookie session
  //if not req.user user is not authenticated
  if (!req.user) {
    return res.status(401).json({ msg: 'You must be signed in!' })
  }
  next();
}