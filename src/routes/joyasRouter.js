const { Router } = require('express');
const { handleGetJoyas, handleGetJoyasFilters } = require('../controllers/APIcontroller');

const router = Router();

router.get('/', handleGetJoyas);
router.get('/filters', handleGetJoyasFilters);

module.exports = router;
