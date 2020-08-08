/**
 * Checks if required fields of information exist.
 * In case of missing fields responds with HTTP 400 
 * and description of those fields.
 * @param {string[]} fields Required fields of information
 */
const hasFields = (fields) => {
    return (req, res, next) => {
        let error = '';
        for (field of fields) {
            if (!req.body[field]) error += `A required field '${field}' is missing. `;
        }
        if (error) return res.status(400).json({error: error});
        else next();
    }
}

module.exports = hasFields;