const Joyas = require('../models/joyas.model');

const handleGetJoyas = async (req, res, next) => {
    try {
        const joyas = await Joyas.getAll(req.query);
        res.json(joyas);
    } catch (error) {
        next(error);
    }
};

const handleGetJoyasFilters = async (req, res, next) => {
    try {
        const joyas = await Joyas.getFilters(req.query);
        res.json(joyas);
    } catch (error) {
        next(error);
    }
};

module.exports = { handleGetJoyas, handleGetJoyasFilters };
