const router = require('express').Router();
const {CityController} = require('../../controllers')
const {CityMiddlewares} = require('../../middlewares/')
router
    .post('/',
    CityMiddlewares.validateCreateRequest,
    CityController.createCity);

router.get('/', CityController.getCities);

router.get('/:id',CityController.getCity);

router.delete('/:id',CityController.destroyCity);

router.patch('/:id', CityController.updateCity);

module.exports = router;