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

// paged items route
app.get('/api/items', (req, res, next) => {

    list_limit = 150;
    logger.info('PLACES_URL: ' + config.PLACES_URL)
    places_url = config.PLACES_URL +"?limit=" + list_limit;
    logger.info('place_url: '+places_url)
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
            const items = placeData.data.map(i => ({ id: (i.id ), name: 'Place ' + (i.name.en) }));
            console.log(items[-1])
        
            // get page from query params or default to first page
            const page = parseInt(req.query.page) || 1;
        
            // get pager object for specified page
            const pager = paginate(items.length, page);
        
            // get page of items from items array
            const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
        
            // return pager object and current page of items
            return res.json({ pager, pageOfItems });
        })
    })
    .on('error', err => {
        logger.error("Error: ", err.message)
    })
});

// function getPlacesData(){

// }

// start server

app.listen(config.PORT, () => console.log('Server listening on port ' + port));
