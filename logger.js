const logger = (req, res, next) => {
  const {name} = req.query
  if(name !== 'john'){
    res.send('<h1>Not Authorised</h1>')
  } else if (name === 'john'){
    console.log('Authorised')
  }
  next();
};

module.exports = logger;