const {StatusCodes} = require('http-status-codes')
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


module.exports= {
    createFlight,
}