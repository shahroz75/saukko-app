const logger = {
  info: (...params) => console.log(...params),
  error: (...params) => console.error(...params)
}

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

const validateFields = (fields) => {
return (req, res, next) => {
  for (let field of fields) {
    if (!req.body[field]) {
      return res.status(400).json({ errorMessage: `${field} is required` });
    }
  }
  next();
};
};

module.exports = {
  logger,
  requestLogger,
  unknownEndpoint,
  errorHandler,
  validateFields
}