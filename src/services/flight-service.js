const {StatusCodes} = require('http-status-codes')
const {Op} = require('sequelize');
const {FlightRepository} = require('../repositories')
const AppError = require('../utils/errors/app-error')
const {compareTime} = require('../utils/helpers/datetime-helpers')
const flightRepository = new FlightRepository();

async function createFlight(data){
    try {
        if(compareTime(data.arrivalTime,data.departureTime)){
            const flight = await flightRepository.create(data);
            return flight;
        }
        else{
            throw new AppError('Your Flights departure time is after arrival time',StatusCodes.BAD_REQUEST)
        }
    } catch (error) {
        
        if(error.name == "SequelizeValidationError"){
            let explanation = [];
            error.errors.forEach((err)=>{
                explanation.push(err.message);
            })
            console.log(explanation)
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new Flight object',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAllFlights(query){
    let customFliter = {}
    let sortFilter = []
    const endingTripTime =" 23:59:00";
    if(query.trips){
        [departureAirportId, arrivalAirportId] = query.trips.split("-");
        customFliter.departureAirportId = departureAirportId;
        customFliter.arrivalAirportId = arrivalAirportId;
    }
    if(query.price){
        [minPrice,maxPrice] =query.price.split("-");
        customFliter.price = {
            [Op.between] :[minPrice,(maxPrice === undefined )? 20000: maxPrice]
        }
    }
   
    
    if(query.travellers){
        customFliter.totalSeats={
            [Op.gte]:query.travellers
        }
    }
    console.log(query.tripDate + endingTripTime)
    if(query.tripDate) {
        customFliter.departureTime = {
            [Op.between]: [query.tripDate, query.tripDate + endingTripTime]
        }
    }
    if(query.sort) {
        const params = query.sort.split(',');
        const sortFilters = params.map((param) => param.split('_'));
        sortFilter = sortFilters
    }
    
    try {
        const flights = await flightRepository.getAllFlights(customFliter,sortFilter);
        return flights;
    } catch (error) {
        throw new AppError('Cannot fetch data of airplane',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
module.exports= {
    createFlight,
    getAllFlights,
}