const router = require('express').Router();
const {AirportController} = require('../../controllers')
const {AirportMiddlewares} = require('../../middlewares')
router
    .post('/',
        AirportMiddlewares.validateCreateRequest,
        AirportController.createAirport);

router.get('/', AirportController.getAirports);

router.get('/:id',AirportController.getAirport);

router.delete('/:id',AirportController.destroyAirport);

router.patch('/:id', AirportController.updateAirport);

module.exports = router;