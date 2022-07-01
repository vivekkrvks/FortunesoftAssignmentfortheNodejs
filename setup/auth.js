exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
  //   const token = authHeader && authHeader.split(' ')[1]
    const token = authHeader
    if (token == null) return res.sendStatus(401)
  
    if(token == process.env.ACCESS_TOKEN){
      next()
  
    } else {
      res.sendStatus(401)
    }
  
  }