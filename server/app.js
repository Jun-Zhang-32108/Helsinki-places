const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const paginate = require('jw-paginate');
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
// app.use(middleware.requestLogger);
// app.use(middleware.unknownEndpoint)
// app.use(middleware.errorHandler)

// paged items route
app.get('/api/items', (req, res, next) => {

    //Default page size is 10
    page_size = 10;

    // get page from query params or default to first page
    const page = parseInt(req.query.page) || 1;
    const start_index = (page - 1) * page_size
    places_url = config.PLACES_URL +"?limit=" + page_size + "&start=" + start_index;
    let now = new Date();
    logger.info('place_url: '+ places_url)
    logger.info('now: '+now.getDay())

    // list_limit = 200;
    // places_url = config.PLACES_URL +"?limit=" + list_limit;

    //Get data
    http
    .get(places_url, resp => {
        let data = ''
        resp.on('data', chunk => {
            data += chunk
        })
        resp.on('end', () => {
            placeData = JSON.parse(data)
            // console.log(placeData.data)

            // example array of 150 items to be paged
            const items = placeData.data.map(i => ({ 
                id: (i.id ), 
                name: 'Place ' + (i.name.en),
                address: i.location.address.street_address + ',' + i.location.address.postal_code + ' ' + i.location.address.locality,  
                opening_hours: getOpenTime(i.opening_hours.hours, now.getDay()-1),
                opening_hours_exception: i.opening_hours.openinghours_exception || 'N/A'
             }));
            console.log(items)
        

        
            // get pager object for specified page
            const pager = paginate(placeData.meta.count, page);
            // logger.info('Pager: ', pager)
        
            // get page of items from items array
            const pageOfItems = items.slice(0);
        
            // return pager object and current page of items
            return res.json({ pager, pageOfItems });
        })
    })
    .on('error', err => {
        logger.error("Error: ", err.message)
    })
});

function getOpenTime(open_hours, today_index){
    let open_time;
    if (open_hours)
    {
        let today_open_hours = open_hours[today_index];
        if (today_open_hours.opens || today_open_hours.closes)
            {open_time = today_open_hours.opens + ' - ' +  today_open_hours.closes;}
        else
            {open_time = 'unknow';}

    }
    else
        {open_time = 'unknow';}

    return open_time;
}

// // start server
// const port = 4000;
// app.listen(port, () => console.log('Server listening on port ' + port));
module.exports = app
