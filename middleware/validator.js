const joi = require('joi')

exports.signUpValidator = async (req, res, next)=> {
    const schema = joi.object({
        firstName: joi.string().min(3).max(30).pattern(new RegExp('^[A-Za-z]+$')).required().messages({
            'any.required': 'First name is required',
            'string.max': 'First name should not be 30 characters long',
            'string.min': 'First name should not be 3 characters short',
            'string.empty': '',
            'string.pattern.base': 'No space required in the first name field'
        }),
        lastName: joi.string().min(3).max(30).pattern(new RegExp('^[A-Za-z]+$')).required().messages({
            'any.required': 'Last name is required',
            'string.max': 'Last name should not be 30 characters long',
            'string.min': 'Last name should not be 3 characters short',
            'string.empty': '',
            'string.pattern.base': 'No space required in the last name field'
        }),
        email: joi.string().email().required().messages({
            'any.required': 'first name is required',
            'string.empty': 'Email cannot be empty',
            'string.email': 'Invalid email format'
        })
    })
    const { error } = schema.validate(req.body)
    if (error) {
        res.status(400).json({
            message: error.details[0].message
        })
    }
}