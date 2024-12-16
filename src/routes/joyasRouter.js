const { Router } = require('express');
const { handleGetJoyas, handleGetJoyasFilters } = require('../controllers/APIcontroller');

const router = Router();

router.get('/', handleGetJoyas);
router.get('/filtros', handleGetJoyasFilters);

module.exports = router;
