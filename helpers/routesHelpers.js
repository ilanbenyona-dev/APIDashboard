const Joi = require('@hapi/joi');

module.exports = {

    // Generic function to validate any kind of param in the URL supplied by the client (it can be userID, projectID, ect.)
    // The power of this function is that it makes the parameter validation very generic as it changes the common object 'req'
    // and creates array of params within it, instead of relying on one single param, which isnt a modular practice to do
    validateParam: (schema, name) => {
        return (req, res, next) => {
            const result = Joi.validate({ param: req['params'][name] }, schema)
            if(result.error) {
                // Wrong param, return error
                return result.status(400).json(result.error);
            }
            else {
                // Creating the req.value['params'] Object that we are passing to the 'next()' function
                if(!req.value)
                    req.value = {};
                
                if(!req.value['params'])
                    req.value['params'] = {};
                
                // Initilizing the param field with the result for the next callback
                req.value['params'][name] = result.value.param;
                next();
            }
        }
    },

    validateBody: (schema) => {
        return (req, res, next) => {
            const result = Joi.validate(req.body, schema);

            if(result.error) {
                return res.status(400).json(result.error);
            } else {
                // Creating the req.value['body'] Object that we are passing to the 'next()' function
                if(!req.value)
                    req.value = {};
                
                if(!req.value['body'])
                    req.value['body'] = {};
                
                // Initilizing the req body field with the result for the next callback
                req.value['body'] = result.value;
                next();
            }
        } 
    },
    // Joi schemas used for validations 
    schemas: {
        projectSchema: Joi.object().keys({
            
        }),

        idSchema: Joi.object({
            // id field - as presented in mongodb database
            param: Joi.string().pattern(new RegExp(/^[0-9A-F]{24}$/)).required()
        })
    }
}