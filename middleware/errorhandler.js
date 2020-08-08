const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        const msg = mongooseValidationErrorMsg(error.errors);
        return response.status(400).json({error: msg});
    }
  
    next(error)
}

const mongooseValidationErrorMsg = (errors) => {
    let msg = '';
    for (let [key, value] of Object.entries(errors)) {
        if (errors.hasOwnProperty(key)) {
            msg += value.message + ' ';
        }
    }
    return msg;
}

module.exports = errorHandler;