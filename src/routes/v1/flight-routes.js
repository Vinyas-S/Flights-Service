const router = require('express').Router();
const {FlightController} = require('../../controllers')
const {FlightMiddlewares} = require('../../middlewares')
router
    .post('/',
     FlightMiddlewares.validateCreateRequest,
     FlightController.createFlight );

router.get('/',FlightController.getAllFlights);
 
module.exports = router;