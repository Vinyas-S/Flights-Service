const express = require('express')
const {ServerConfig, Logger} =require('./config')
const apiRoutes = require('./routes')

const app =express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api',apiRoutes);

app.listen(ServerConfig.PORT,async()=>{
    console.log(`server started on ${ServerConfig.PORT}`);
    Logger.info("Sucessfully started server ",{})
    
    const {Airport, City}  = require('./models');
    // const cities = await City.findByPk(1);
    // console.log(cities);
    // const airport  = await Airport.create({name:'Kempegowda airport', code:'BLR',})
    // console.log(airport);
    // const response = await cities.createAirport({name:'Hubbali airport', code:'HBL',})
    // console.log(response)
    // const airports = await cities.getAirports();
    // console.log(airports);
    // const response = await Airport.findByPk(6);
    // console.log(response)
    // await cities.removeAirport(response);
    await City.destroy({
        where:{
            id:1
        }
    })
});

//bad code alert

