const Joi = require('@hapi/joi');

const remortgage = Joi.object().keys({
    additionalBorrowing: Joi.number().required(),
    balance: Joi.number().required(),
    monthlyPayment: Joi.number().required(),
    yearsRemaining: Joi.number().required(),
});

const purchase = Joi.object().keys({
    purchasePrice: Joi.number().required(),
});

const applicant = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
});

const applyRequest = Joi.object().keys({
    remortgage: remortgage,
    purchase: purchase,
    applicants: Joi.array().items(applicant).min(1).max(2).required(),
    term: Joi.number().required(),
}).nand('remortgage', 'purchase').or('remortgage', 'purchase');

module.exports = {
    applyRequest,
};
