# Helsinki-places
### Author: Jun Zhang \<jun.1.zhang@aalto.fi>

In this project, a web program that lists and displacy places in Helsinki is implemented with React as frontend and Node.js as backend (use express framework). To develop this program, I use the [Jason Watmore's work](https://github.com/cornflourblue/react-node-server-side-pagination) as a basic skeleton. For testing, I use [JEST](https://jestjs.io/). 

## Get started

Clone this repo :

Install dependencies for backend :

1. `cd server`

2. `yarn install`

Start the backend in production mode :
`yarn start`

Notice that some values are passed as environment variables, which are saved in a .env file and I do not upload this file. So in order to take use run the backend, you need to create an .env file by yourself and define the values of PLACES_URL and PORT there. We use this [URL](http://open-api.myhelsinki.fi/doc#/v1places/listAll) and port 4000 by default.

Then for the frontend :
1. `cd client`

2. `yarn install`

3. `yarn start`

## Contents
* `client` frontend
* `server` backend

## Demo
This web app is now deployed to Azure. You can try it out by click [here](http://52.156.250.103:9000/)!
